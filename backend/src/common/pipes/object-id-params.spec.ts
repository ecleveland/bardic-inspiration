import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Server } from 'http';
import request from 'supertest';
import { SpellsController } from '../../spells/spells.controller';
import { SpellsService } from '../../spells/spells.service';
import { TemplatesController } from '../../templates/templates.controller';
import { TemplatesService } from '../../templates/templates.service';
import { GenerationController } from '../../generation/generation.controller';
import { GenerationService } from '../../generation/generation.service';

const VALID_ID = '507f1f77bcf86cd799439011';

// Every :id path param below feeds straight into a Mongoose findById.
// Without a pipe, 'bad-id' throws a CastError and surfaces as a 500.
describe('ObjectId path param validation (VEG-63)', () => {
  let app: INestApplication;
  let server: Server;
  let spells: Record<string, jest.Mock>;
  let templates: Record<string, jest.Mock>;
  let generation: Record<string, jest.Mock>;

  beforeEach(async () => {
    spells = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
    };
    templates = {
      findAll: jest.fn().mockResolvedValue([]),
      findRandom: jest.fn().mockResolvedValue(null),
      findOne: jest.fn().mockResolvedValue(null),
    };
    generation = {
      generate: jest.fn().mockResolvedValue({}),
      findOne: jest.fn().mockResolvedValue(null),
      rate: jest.fn().mockResolvedValue(null),
    };

    const module = await Test.createTestingModule({
      controllers: [
        SpellsController,
        TemplatesController,
        GenerationController,
      ],
    })
      .useMocker((token) => {
        if (token === SpellsService) return spells;
        if (token === TemplatesService) return templates;
        if (token === GenerationService) return generation;
        return undefined;
      })
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterEach(async () => {
    await app.close();
  });

  describe.each([
    ['/spells/:id', '/spells', () => spells],
    ['/templates/:id', '/templates', () => templates],
    ['/generations/:id', '/generations', () => generation],
  ])('%s', (_label, base, getService) => {
    it('should return 400 for a malformed id', async () => {
      await request(server).get(`${base}/bad-id`).expect(400);
      expect(getService().findOne).not.toHaveBeenCalled();
    });

    it('should reach the service for a well-formed id', async () => {
      await request(server).get(`${base}/${VALID_ID}`);
      expect(getService().findOne).toHaveBeenCalledWith(VALID_ID);
    });
  });

  describe('POST /generations/:id/rate', () => {
    it('should return 400 for a malformed id', async () => {
      await request(server)
        .post('/generations/bad-id/rate')
        .send({ rating: 5 })
        .expect(400);
      expect(generation.rate).not.toHaveBeenCalled();
    });

    it('should reach the service for a well-formed id', async () => {
      await request(server)
        .post(`/generations/${VALID_ID}/rate`)
        .send({ rating: 5 });
      expect(generation.rate).toHaveBeenCalledWith(VALID_ID, 5);
    });
  });

  describe('GET /templates/random', () => {
    it('should not be captured by the :id route', async () => {
      await request(server).get('/templates/random').expect(200);
      expect(templates.findRandom).toHaveBeenCalled();
    });
  });
});
