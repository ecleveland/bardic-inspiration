import {
  ArgumentsHost,
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

// The integration spec covers the response bodies. This one covers what
// reaches the log, which is the half a client can never observe.
function hostFor(method: string, url: string, headersSent = false) {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const host = {
    switchToHttp: () => ({
      getResponse: () => ({ status, json, headersSent }),
      getRequest: () => ({ method, url, originalUrl: url }),
    }),
  } as unknown as ArgumentsHost;
  return { host, status, json };
}

describe('AllExceptionsFilter logging', () => {
  let filter: AllExceptionsFilter;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    filter = new AllExceptionsFilter();
    errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('should log an unknown error', () => {
    const { host } = hostFor('GET', '/api/spells');
    filter.catch(new Error('mongo is down'), host);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it('should name the method and path in the log', () => {
    const { host } = hostFor('POST', '/api/generate');
    filter.catch(new Error('mongo is down'), host);
    const logged = errorSpy.mock.calls[0].join(' ');
    expect(logged).toContain('POST');
    expect(logged).toContain('/api/generate');
  });

  it('should pass the real error to the logger so the stack survives', () => {
    const { host } = hostFor('GET', '/api/spells');
    const cause = new Error('mongo is down');
    filter.catch(cause, host);
    expect(errorSpy.mock.calls[0]).toContain(cause);
  });

  // The gap this ticket actually closes: a 502 from the Anthropic mapping
  // reaches the client and, today, leaves no server-side trace at all.
  it('should log a 5xx HttpException', () => {
    const { host } = hostFor('POST', '/api/generate');
    filter.catch(
      new InternalServerErrorException('Lyric generation failed'),
      host,
    );
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it('should log a 502 raised by the generation service', () => {
    const { host } = hostFor('POST', '/api/generate');
    filter.catch(
      new HttpException('Lyric generation is unavailable', 502),
      host,
    );
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it('should not log a 404', () => {
    const { host } = hostFor('GET', '/api/spells/507f1f77bcf86cd799439011');
    filter.catch(new NotFoundException('not found'), host);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should not log a validation failure', () => {
    const { host } = hostFor('POST', '/api/generate');
    filter.catch(
      new BadRequestException(['spellId must be a mongodb id']),
      host,
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should send the status the exception carries', () => {
    const { host, status } = hostFor('GET', '/api/spells');
    filter.catch(new NotFoundException('not found'), host);
    expect(status).toHaveBeenCalledWith(404);
  });

  // BaseExceptionFilter guards both its write paths with isHeadersSent. Without
  // the same guard, an error thrown after the response has started makes
  // res.status().json() raise ERR_HTTP_HEADERS_SENT from inside the filter,
  // which escapes to Express and buries the original failure.
  describe('when the response has already started', () => {
    it('should not try to write a second response', () => {
      const { host, status, json } = hostFor('GET', '/api/spells', true);
      filter.catch(new Error('thrown after send'), host);
      expect(status).not.toHaveBeenCalled();
      expect(json).not.toHaveBeenCalled();
    });

    it('should still log the error', () => {
      const { host } = hostFor('GET', '/api/spells', true);
      filter.catch(new Error('thrown after send'), host);
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('cause chain', () => {
    it('should summarise the cause into the log line', () => {
      const { host } = hostFor('POST', '/api/generate');
      const upstream = Object.assign(new Error('overloaded'), {
        status: 529,
        requestID: 'req_abc123',
      });
      filter.catch(
        new HttpException('Lyric generation is unavailable', 502, {
          cause: upstream,
        }),
        host,
      );
      const logged = errorSpy.mock.calls.flat().join(' ');
      expect(logged).toContain('status=529');
      expect(logged).toContain('requestId=req_abc123');
    });

    // The stack would point at the mapper, not the outage, and a liveness
    // probe against a down dependency would write one per poll.
    it('should not attach a stack for an exception we constructed', () => {
      const { host } = hostFor('POST', '/api/generate');
      filter.catch(
        new HttpException('Lyric generation is unavailable', 502),
        host,
      );
      expect(errorSpy.mock.calls[0]).toHaveLength(1);
    });
  });

  it('should send 500 for an error carrying no status', () => {
    const { host, status } = hostFor('GET', '/api/spells');
    filter.catch('a thrown string', host);
    expect(status).toHaveBeenCalledWith(500);
  });
});
