import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { SpellsModule } from './spells/spells.module';
import { GenresModule } from './genres/genres.module';
import { TemplatesModule } from './templates/templates.module';
import { GenerationModule } from './generation/generation.module';
import { HealthModule } from './health/health.module';
import { AllExceptionsFilter } from './common/filters';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGODB_URI',
          'mongodb://localhost:27017/bardic-inspiration',
        ),
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    SpellsModule,
    GenresModule,
    TemplatesModule,
    GenerationModule,
    HealthModule,
  ],
  // Registered here rather than in main.ts so anything that bootstraps
  // AppModule inherits it, including tests. A filter only main.ts knows about
  // is one every spec has to remember to wire by hand.
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
