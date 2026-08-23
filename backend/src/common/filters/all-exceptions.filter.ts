import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { STATUS_CODES } from 'http';
import type { Request, Response } from 'express';

// getStatus() returns a plain number, and comparing that to an HttpStatus
// member trips no-unsafe-enum-comparison, so keep the threshold a number.
const SERVER_ERROR = 500;

/**
 * Only messages this codebase authored reach the client.
 *
 * An HttpException is something we threw deliberately, so its payload is meant
 * for the caller and passes through whole. Everything else collapses to a
 * message derived from the status alone: a raw Error, a driver failure, or the
 * http-errors shape, which Nest's own filter forwards verbatim because it
 * happens to carry both `statusCode` and `message`.
 *
 * The invariant that keeps a 5xx safe therefore sits upstream of this class.
 * Never pass a caught error's text into a 5xx constructor. Put the detail in
 * `cause`, which is logged and never serialized.
 *
 * Not extending BaseExceptionFilter on purpose. Its message handling is what we
 * are replacing, and inheriting it leaves a super.catch() one edit away from
 * undoing the sanitizing. Two things it does are worth keeping and are
 * reproduced below, the isHeadersSent guard and honouring a status on an error
 * that carries one.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionsHandler');

  catch(exception: unknown, host: ArgumentsHost): void {
    // @Catch() with no argument makes this context-agnostic and APP_FILTER
    // registers it globally, so a non-HTTP host would otherwise make the filter
    // throw and replace the failure it was called to report.
    if (host.getType() !== 'http') {
      return;
    }

    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();
    const status = statusOf(exception);

    this.log(exception, status, request);

    // An error raised after the response started would make the write below
    // throw ERR_HTTP_HEADERS_SENT, which escapes the filter and buries the real
    // failure behind a secondary one. The log above has already run.
    if (response.headersSent) {
      return;
    }

    response.status(status).json(bodyFor(exception, status, request));
  }

  private log(exception: unknown, status: number, request: Request): void {
    const cause =
      exception instanceof HttpException ? exception.cause : undefined;

    // A 4xx is the caller's problem and logging it would drown the log in
    // validation noise. A cause marks the exception as one we classified from
    // an upstream failure, and Anthropic throttling arrives as a 429, so a
    // rate-limited outage recording nothing is the gap this filter closes.
    if (status < SERVER_ERROR && cause === undefined) {
      return;
    }

    const where = `${request.method} ${request.originalUrl} ${status}`;

    // An exception we constructed is a condition already classified, so one
    // line says everything. Its stack would only point back at the mapper, and
    // a liveness probe against a down dependency would write one per poll.
    // Still at error level, because an Anthropic outage is not a warning.
    if (exception instanceof HttpException) {
      this.logger.error(
        cause === undefined ? where : `${where} ${describe(cause)}`,
      );
      return;
    }

    // Unclassified, so the stack is the only clue. Passing the error alone lets
    // the logger inspect it, and util.inspect already walks the cause chain, so
    // passing cause separately would print it twice.
    this.logger.error(where, exception);
  }
}

function bodyFor(
  exception: unknown,
  status: number,
  request: Request,
): Record<string, unknown> {
  const envelope = {
    // req.path rather than originalUrl. It answers the mounted-router problem
    // req.url has, without reflecting the caller's query string into a body
    // that may be cached or shipped to an aggregator. The log line still gets
    // the full originalUrl.
    path: request.path,
    timestamp: new Date().toISOString(),
  };

  if (exception instanceof HttpException) {
    const payload = exception.getResponse();

    // terminus puts a whole HealthCheckResult here and callers may supply any
    // object. Forward it rather than mining it for a message, which would
    // reduce a health report to the exception's class name. statusCode is
    // spread first so a payload carrying its own wins.
    if (typeof payload === 'object' && payload !== null) {
      return { statusCode: status, ...payload, ...envelope };
    }

    return {
      statusCode: status,
      message: payload,
      error: reasonText(status),
      ...envelope,
    };
  }

  return {
    statusCode: status,
    // Not "Internal server error" unless it really is one. statusOf honours the
    // 413 body-parser reports, and telling that caller the server broke sends
    // them off to retry when the fix is to send less data.
    message:
      status < SERVER_ERROR ? reasonText(status) : 'Internal server error',
    error: reasonText(status),
    ...envelope,
  };
}

function reasonText(status: number): string {
  return STATUS_CODES[status] ?? 'Error';
}

/**
 * Nest's routes-resolver converts only SyntaxError and URIError into an
 * HttpException. Body-parser's other failures reach a filter as plain Errors
 * carrying a statusCode: PayloadTooLargeError at 413, charset and encoding
 * failures at 415, request.aborted at 400. Dropping to 500 for those would turn
 * a caller's oversized request into a server fault.
 */
function statusOf(exception: unknown): number {
  if (exception instanceof HttpException) {
    return exception.getStatus();
  }

  if (typeof exception === 'object' && exception !== null) {
    const { statusCode } = exception as { statusCode?: unknown };
    if (
      typeof statusCode === 'number' &&
      statusCode >= 400 &&
      statusCode <= 599
    ) {
      return statusCode;
    }
  }

  return HttpStatus.INTERNAL_SERVER_ERROR;
}

/** A one-line summary of a cause, for a log that does not want a stack. */
function describe(cause: unknown): string {
  if (!(cause instanceof Error)) {
    return typeof cause === 'string' ? cause : 'unknown cause';
  }

  const { status, requestID } = cause as {
    status?: unknown;
    requestID?: unknown;
  };
  // constructor.name, not name. Every Anthropic SDK error class leaves `name`
  // as the literal "Error", so keying on it cannot tell a bad key from an
  // overload from a socket hang up.
  const parts = [cause.constructor.name];
  // Only primitives. An object would stringify to [object Object] and bury the
  // line it is meant to clarify.
  if (isScalar(status)) parts.push(`status=${status}`);
  if (isScalar(requestID)) parts.push(`requestId=${requestID}`);
  return parts.join(' ');
}

function isScalar(value: unknown): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}
