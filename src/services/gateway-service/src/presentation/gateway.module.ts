import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GatewayMiddleware } from '../infrastructure/middleware/gateway.middleware';
import { JwtStrategy } from '../infrastructure/stategies/jwt.strategy';
import { JwtAuthGuard } from '../infrastructure/guard/jwt.guard';
import { UserGatewayController } from './gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Nếu bạn muốn ConfigService dùng toàn cục
    }),
    HttpModule,
  ],
  controllers: [UserGatewayController],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class GatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GatewayMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
