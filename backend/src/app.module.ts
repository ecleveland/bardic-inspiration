import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { SpellsModule } from './spells/spells.module';
import { GenresModule } from './genres/genres.module';
import { TemplatesModule } from './templates/templates.module';
import { GenerationModule } from './generation/generation.module';
import { HealthModule } from './health/health.module';

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
})
export class AppModule {}
