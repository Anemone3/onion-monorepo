import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //Global nestjs config
  const configServer = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(morgan('dev'));

    app.use(
      cors({
        origin: true,
        credentials: true,
      }),
    );

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(configServer.get<number>('PORT') ?? 3003, () => {
    console.log(
      `Server is running on port localhost:${configServer.get<number>('PORT') ?? 3003}`,
    );
  });
}
bootstrap();
