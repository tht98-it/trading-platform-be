import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GatewayMiddleware } from '../infrastructure/middleware/gateway.middleware';
import { JwtStrategy } from '../infrastructure/stategies/jwt.strategy';
import { JwtAuthGuard } from '../infrastructure/guard/jwt.guard';
import { UserGatewayController } from './gateway.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // rõ ràng hơn
  ],
  controllers: [UserGatewayController],
  providers: [JwtStrategy],
})
export class GatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GatewayMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
