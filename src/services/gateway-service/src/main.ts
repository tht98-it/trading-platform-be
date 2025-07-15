import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './presentation/gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors(); // Cho phép cross-origin
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT', 8080));
}
bootstrap();
