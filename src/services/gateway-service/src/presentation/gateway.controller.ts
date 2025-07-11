import { Controller, Get } from '@nestjs/common';
import { GatewayService } from '../application/gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Get()
  getStatus(): string {
    return this.gatewayService.getStatus();
  }
}
