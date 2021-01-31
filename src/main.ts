import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));

  const configService = app.get(ConfigService);
  const port = configService.get('server.port');

  const options = new DocumentBuilder()
    .setTitle('Customer Statements API')
    .setDescription('Allows customers to generate a I&E statement')
    .setVersion('0.1')
    .addTag('customers', 'Handles customers personal information')
    .addTag('statemets', 'Handles customers I&E statements')
    .addTag('ping', 'Endpoint used to check the API health')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  logger.log(`Server running on port: ${port}`);
}
bootstrap();
