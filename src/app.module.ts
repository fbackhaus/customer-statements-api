import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { StatementsModule } from './statements/statements.module';
import { PingModule } from './ping/ping.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/db.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        SERVER_PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    StatementsModule,
    PingModule,
    UsersModule,
  ],
})
export class AppModule {}
