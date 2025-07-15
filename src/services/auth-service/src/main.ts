import { NestFactory } from '@nestjs/core';
import { AuthModule } from './presentation/auth.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT', 8081));
}
bootstrap();
