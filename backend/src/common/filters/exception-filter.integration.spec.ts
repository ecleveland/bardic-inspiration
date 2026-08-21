import {
  Body,
  Controller,
  Get,
  HttpException,
  INestApplication,
  NotFoundException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IsMongoId, IsString, MaxLength } from 'class-validator';
import type { Server } from 'http';
import request from 'supertest';
import { AllExceptionsFilter } from './all-exceptions.filter';

class ProbeDto {
  @IsMongoId()
  spellId: string;

  @IsString()
  @MaxLength(5)
  nickname: string;
}

@Controller('probe')
class ProbeController {
  @Get('raw')
  raw() {
    throw new Error(
      'boom at /Users/picardvega/Projects/bardic-inspiration/backend/src/secret.ts:42',
    );
  }

  @Get('mongo')
  mongo() {
    const err = new Error(
      'E11000 duplicate key error collection: bardic.generations',
    );
    err.name = 'MongoServerError';
    throw err;
  }

  @Get('http-error-shape')
  httpErrorShape() {
    // The shape @nestjs/core's isHttpError() branch forwards verbatim.
    const err = new Error('internal detail that was never meant for a client');
    Object.assign(err, { statusCode: 418, status: 418 });
    throw err;
  }

  @Get('deliberate-502')
  deliberate502() {
    // What GenerationService raises when Anthropic is unreachable.
    throw new HttpException('Lyric generation is unavailable', 502);
  }

  @Get('deliberate-404')
  deliberate404() {
    throw new NotFoundException('Spell with id abc not found');
  }

  @Post('validated')
  validated(@Body() dto: ProbeDto) {
    return dto;
  }
}

describe('AllExceptionsFilter over HTTP (VEG-66)', () => {
  let app: INestApplication;
  let server: Server;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProbeController],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterEach(async () => {
    await app.close();
  });

  describe('errors we did not author', () => {
    it('should return a generic 500 for a raw Error', async () => {
      const res = await request(server).get('/probe/raw');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal server error');
    });

    it('should not leak a filesystem path from the error message', async () => {
      const res = await request(server).get('/probe/raw');
      const body = JSON.stringify(res.body);
      expect(body).not.toContain('/Users/');
      expect(body).not.toContain('secret.ts');
      expect(body).not.toContain('boom');
    });

    it('should not leak a database error message', async () => {
      const res = await request(server).get('/probe/mongo');
      expect(res.status).toBe(500);
      const body = JSON.stringify(res.body);
      expect(body).not.toContain('E11000');
      expect(body).not.toContain('bardic.generations');
    });

    it('should not forward a message just because the error carries statusCode', async () => {
      // Nest's default filter returns this one's message verbatim.
      const res = await request(server).get('/probe/http-error-shape');
      expect(res.status).toBe(500);
      expect(JSON.stringify(res.body)).not.toContain(
        'never meant for a client',
      );
    });

    it('should never include a stack trace', async () => {
      const res = await request(server).get('/probe/raw');
      expect(res.body).not.toHaveProperty('stack');
      expect(JSON.stringify(res.body)).not.toContain('    at ');
    });
  });

  describe('body parser failures', () => {
    // Nest wraps body-parser's SyntaxError in a BadRequestException before any
    // filter sees it, and the original `type: 'entity.parse.failed'` is gone by
    // then, so there is no structural way to tell it from a 400 we raised. It
    // is kept rather than suppressed: Nest authored that exception, and the
    // message describes the caller's own malformed payload, which is exactly
    // what a caller needs to fix the request. What must not appear is anything
    // about the server.
    it('should return a clean 400 carrying no server detail', async () => {
      const res = await request(server)
        .post('/probe/validated')
        .set('Content-Type', 'application/json')
        .send('{"spellId": "abc", BROKEN}');

      expect(res.status).toBe(400);
      const body = JSON.stringify(res.body);
      expect(body).not.toContain('/Users/');
      expect(body).not.toContain('node_modules');
      expect(body).not.toContain('    at ');
      expect(res.body).not.toHaveProperty('stack');
    });

    it('should still use the standard envelope', async () => {
      const res = await request(server)
        .post('/probe/validated')
        .set('Content-Type', 'application/json')
        .send('{"spellId": "abc", BROKEN}');

      expect(res.body).toMatchObject({
        statusCode: 400,
        path: '/probe/validated',
      });
      expect(typeof res.body.timestamp).toBe('string');
    });
  });

  describe('errors we did author', () => {
    it('should preserve a deliberate NotFoundException message', async () => {
      const res = await request(server).get('/probe/deliberate-404');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Spell with id abc not found');
    });

    // A 5xx we raised keeps its message. It is deliberately generic already,
    // and forcing 'Internal server error' here would undo VEG-77's mapping,
    // which exists to tell an outage apart from a rate limit. The rule is that
    // only authored messages survive, not that 5xx must be wordless.
    it('should preserve a deliberate 502 message', async () => {
      const res = await request(server).get('/probe/deliberate-502');
      expect(res.status).toBe(502);
      expect(res.body.message).toBe('Lyric generation is unavailable');
    });

    it('should preserve the per-field array from ValidationPipe', async () => {
      const res = await request(server)
        .post('/probe/validated')
        .send({ spellId: 'not-an-id', nickname: 'far too long' });

      expect(res.status).toBe(400);
      expect(Array.isArray(res.body.message)).toBe(true);
      expect(res.body.message.join(' ')).toContain('spellId');
      expect(res.body.message.join(' ')).toContain('nickname');
    });
  });

  describe('response envelope', () => {
    it('should use one shape for an unknown error', async () => {
      const res = await request(server).get('/probe/raw');
      expect(res.body).toMatchObject({
        statusCode: 500,
        message: 'Internal server error',
        path: '/probe/raw',
      });
      expect(typeof res.body.timestamp).toBe('string');
    });

    it('should use the same shape for an HttpException', async () => {
      const res = await request(server).get('/probe/deliberate-404');
      expect(res.body).toMatchObject({
        statusCode: 404,
        path: '/probe/deliberate-404',
      });
      expect(typeof res.body.timestamp).toBe('string');
    });
  });
});
