import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule} from '@nestjs/swagger';
import { parse } from 'yaml';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rootDirname = dirname(__dirname);
  const doc_api = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(doc_api);
  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
}
bootstrap();
