import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from '../application/gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService, GatewayGateway],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // nếu bạn muốn dùng ở tất cả modules
    }),
  ],
})
export class GatewayModule {}
