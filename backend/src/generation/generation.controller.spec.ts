import { INestApplication, Logger, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Server } from 'http';
import request from 'supertest';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';
import { AllExceptionsFilter } from '../common/filters';

const VALID_ID = '507f1f77bcf86cd799439011';
const body = { spellId: VALID_ID, genreId: VALID_ID };

describe('GenerationController', () => {
  let app: INestApplication;
  let server: Server;
  let generationService: Record<string, jest.Mock>;
  let errorSpy: jest.SpyInstance;

  beforeEach(async () => {
    // Two cases below drive the filter's 5xx branch on purpose; without this
    // a green run prints their stack traces to stderr.
    errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    generationService = {
      generate: jest.fn().mockResolvedValue({ _id: 'gen-1' }),
      findOne: jest.fn().mockResolvedValue(null),
      rate: jest.fn().mockResolvedValue(null),
    };

    const module = await Test.createTestingModule({
      controllers: [GenerationController],
      providers: [{ provide: GenerationService, useValue: generationService }],
    }).compile();

    app = module.createNestApplication();
    // AppModule provides this via APP_FILTER, but this module is built from
    // the controller alone, so it has to be registered by hand. Without it
    // these assertions pass against Nest's default filter and prove nothing
    // about the wiring that actually ships.
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterEach(async () => {
    errorSpy.mockRestore();
    await app.close();
  });

  describe('POST /generate error handling (VEG-77, filter since VEG-66)', () => {
    it('should pass a service HttpException through unchanged', async () => {
      generationService.generate.mockRejectedValue(
        new NotFoundException('Spell with id abc not found'),
      );
      const res = await request(server).post('/generate').send(body);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Spell with id abc not found');
    });

    it('should convert an unexpected error to a 500', async () => {
      generationService.generate.mockRejectedValue(
        new Error('connect ECONNREFUSED 127.0.0.1:27017'),
      );
      const res = await request(server).post('/generate').send(body);
      expect(res.status).toBe(500);
    });

    it('should not leak internal detail in the 500 body', async () => {
      generationService.generate.mockRejectedValue(
        new Error('connect ECONNREFUSED 127.0.0.1:27017'),
      );
      const res = await request(server).post('/generate').send(body);
      expect(JSON.stringify(res.body)).not.toContain('ECONNREFUSED');
      expect(JSON.stringify(res.body)).not.toContain('27017');
    });

    it('should still return the generation on the happy path', async () => {
      const res = await request(server).post('/generate').send(body);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ _id: 'gen-1' });
    });
  });

  // Missing-generation handling on GET and rate belongs to VEG-80.
  describe('GET /generations/:id', () => {
    it('should return the generation when found', async () => {
      generationService.findOne.mockResolvedValue({ _id: VALID_ID });
      const res = await request(server).get(`/generations/${VALID_ID}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ _id: VALID_ID });
    });
  });
});
