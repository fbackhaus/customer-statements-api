import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { StatementsModule } from './statements/statements.module';
import { CustomersModule } from './customers/customers.module';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    StatementsModule,
    CustomersModule,
    PingModule,
  ],
})
export class AppModule {}
