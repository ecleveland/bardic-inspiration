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

/**
 * Only messages this codebase authored reach the client.
 *
 * An HttpException is something we threw deliberately, so its payload is meant
 * for the caller and passes through whole. Everything else collapses to a
 * generic message: a raw Error, a driver failure, or the http-errors shape,
 * which Nest's own filter forwards verbatim because it happens to carry both
 * `statusCode` and `message`.
 *
 * The invariant that keeps a 5xx safe therefore sits upstream of this class:
 * never pass a caught error's text into a 5xx constructor. Put the detail in
 * `cause`, which is logged and never serialized.
 *
 * Not extending BaseExceptionFilter on purpose. Its message handling is what we
 * are replacing, and inheriting it leaves a super.catch() one edit away from
 * undoing the sanitizing. Two things it does are worth keeping and are
 * reproduced below: the isHeadersSent guard, and honouring a status on an error
 * that carries one.
 */
// getStatus() returns a plain number, and comparing that to an HttpStatus
// member trips no-unsafe-enum-comparison. Keep the threshold a number.
const SERVER_ERROR = 500;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionsHandler');

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();

    const status = statusOf(exception);
    const body = this.bodyFor(exception, status, request);

    this.log(exception, status, request);

    // An error raised after the response started would make the write below
    // throw ERR_HTTP_HEADERS_SENT, which escapes the filter and buries the real
    // failure behind a secondary one. The log above has already run.
    if (response.headersSent) {
      return;
    }

    response.status(status).json(body);
  }

  private log(exception: unknown, status: number, request: Request): void {
    if (status < SERVER_ERROR) {
      return;
    }

    const where = `${request.method} ${request.originalUrl} ${status}`;

    // A 5xx we constructed is a condition we already classified, so one line
    // says everything: the stack would only point back at the mapper, and a
    // liveness probe against a down dependency would write one per poll. Still
    // logged at error, because an Anthropic outage is not a warning and an
    // operator filtering on error should see it.
    if (exception instanceof HttpException) {
      const { cause } = exception;
      this.logger.error(
        cause === undefined ? where : `${where} ${describe(cause)}`,
      );
      return;
    }

    // Unclassified: the stack is the only clue. Passing the error alone lets
    // the logger inspect it, and util.inspect already walks the cause chain,
    // so passing cause separately would print it twice.
    this.logger.error(where, exception);
  }

  private bodyFor(
    exception: unknown,
    status: number,
    request: Request,
  ): Record<string, unknown> {
    const envelope = {
      // originalUrl rather than url: Express rewrites req.url under a mounted
      // router, so url can come out relative to the mount point.
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof HttpException) {
      const payload = exception.getResponse();

      // terminus puts a whole HealthCheckResult here, and callers can supply
      // any object they like. Forward it rather than mining it for a message,
      // which would reduce a health report to the exception's class name.
      if (typeof payload === 'object' && payload !== null) {
        return { ...payload, ...envelope };
      }

      return {
        statusCode: status,
        message: payload,
        error: STATUS_CODES[status] ?? 'Error',
        ...envelope,
      };
    }

    return {
      statusCode: status,
      message: 'Internal server error',
      error: STATUS_CODES[status] ?? 'Error',
      ...envelope,
    };
  }
}

/**
 * Nest's routes-resolver converts only SyntaxError and URIError into an
 * HttpException. Body-parser's other failures reach a filter as plain Errors
 * carrying a statusCode: PayloadTooLargeError at 413, charset and encoding
 * failures at 415, request.aborted at 400. Dropping to 500 for those would
 * turn a caller's oversized request into a server fault.
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
  const parts = [cause.name];
  // Only primitives: an object here would stringify to [object Object] and
  // bury the line it is meant to clarify.
  if (isScalar(status)) parts.push(`status=${status}`);
  if (isScalar(requestID)) parts.push(`requestId=${requestID}`);
  parts.push(cause.message);
  return parts.join(' ');
}

function isScalar(value: unknown): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}
