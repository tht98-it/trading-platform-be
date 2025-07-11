import { NestFactory } from '@nestjs/core';
import { UserModule } from './src/presentation/user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT', 3002));
}
bootstrap();
