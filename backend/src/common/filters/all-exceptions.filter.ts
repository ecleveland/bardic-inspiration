import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

// getStatus() returns a plain number, and comparing that to an HttpStatus
// member trips no-unsafe-enum-comparison. Keep the threshold a number.
const SERVER_ERROR = 500;

// Nest's default body carries an `error` field. Keeping it means this envelope
// is a superset of what callers already handle rather than a breaking change.
const STATUS_TEXT: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

interface ErrorBody {
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
}

/**
 * Only messages this codebase authored reach the client.
 *
 * An HttpException is something we threw deliberately, so its message is meant
 * for the caller and passes through at any status. Everything else gets a
 * generic message: a raw Error, a driver failure, or body-parser's http-errors
 * shape, which Nest's own filter would otherwise forward verbatim because it
 * happens to carry both `statusCode` and `message`.
 *
 * The invariant that keeps a 5xx safe is therefore upstream of this class:
 * never pass a caught error's text into a 5xx constructor. Put the detail in
 * `cause` instead, which is logged and never serialized to the client.
 *
 * Not extending BaseExceptionFilter on purpose. Its decision logic is what we
 * are replacing, and inheriting it leaves a super.catch() one edit away from
 * undoing the sanitizing. The isHeadersSent guard it carries is worth keeping
 * though, and is reproduced below.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionsHandler');

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body: ErrorBody = {
      statusCode: status,
      message: this.messageFor(exception),
      error: STATUS_TEXT[status] ?? 'Error',
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    // 4xx is the caller's problem and would flood the log with validation
    // noise. 5xx is ours, and until now nothing recorded it: Nest logs only
    // non-HttpExceptions, so every 502 the generation service raised for an
    // Anthropic outage vanished without a trace.
    if (status >= SERVER_ERROR) {
      // The exception a mapper constructed says nothing useful on its own: its
      // message is a constant and its stack points at the mapper. The cause is
      // where the upstream status and request id live.
      const cause = exception instanceof Error ? exception.cause : undefined;
      this.logger.error(
        `${request.method} ${request.url} ${status}`,
        exception,
        ...(cause === undefined ? [] : [cause]),
      );
    }

    // An error raised after the response started would make this throw
    // ERR_HTTP_HEADERS_SENT, which escapes the filter and buries the real
    // failure behind a secondary one. The log above has already run.
    if (response.headersSent) {
      return;
    }

    response.status(status).json(body);
  }

  private messageFor(exception: unknown): string | string[] {
    if (!(exception instanceof HttpException)) {
      return 'Internal server error';
    }

    const res = exception.getResponse();

    // ValidationPipe puts the per-field failures in a message array. Dropping
    // it would cost API consumers the only detail that makes a 400 actionable.
    if (typeof res === 'object' && res !== null && 'message' in res) {
      const { message } = res as { message: unknown };
      if (Array.isArray(message) || typeof message === 'string') {
        return message as string | string[];
      }
    }

    if (typeof res === 'string') {
      return res;
    }

    return exception.message;
  }
}
