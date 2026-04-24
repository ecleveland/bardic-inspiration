import { Test, TestingModule } from '@nestjs/testing';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: { check: jest.Mock };

  beforeEach(async () => {
    healthCheckService = {
      check: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: healthCheckService },
        { provide: MongooseHealthIndicator, useValue: {} },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should return healthy status when MongoDB is connected', async () => {
      const healthyResult: HealthCheckResult = {
        status: 'ok',
        info: { mongodb: { status: 'up' } },
        error: {},
        details: { mongodb: { status: 'up' } },
      };
      healthCheckService.check.mockResolvedValue(healthyResult);

      const result = await controller.check();

      expect(result).toEqual(healthyResult);
      expect(healthCheckService.check).toHaveBeenCalledTimes(1);
    });

    it('should propagate error when MongoDB is down', async () => {
      const error = new Error('MongoDB connection failed');
      healthCheckService.check.mockRejectedValue(error);

      await expect(controller.check()).rejects.toThrow(
        'MongoDB connection failed',
      );
    });
  });
});
