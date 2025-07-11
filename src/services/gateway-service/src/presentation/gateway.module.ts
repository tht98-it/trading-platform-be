import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from '../application/gateway.service';
import { GatewayGateway } from './gateway.gateway';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService, GatewayGateway],
})
export class GatewayModule {}
