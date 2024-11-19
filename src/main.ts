import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { useContainer } from 'class-validator';
import { ResInterceptor } from './res.interceptor';
import { CatchFilter } from './catch.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  app.use(json({ limit: '5mb' }));
  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResInterceptor());
  app.useGlobalFilters(new CatchFilter());

  app.useGlobalFilters();

  const configService = app.get(ConfigService);
  // config.update({
  //     accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
  //     secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
  //     region: configService.get('AWS_REGION'),
  // });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
