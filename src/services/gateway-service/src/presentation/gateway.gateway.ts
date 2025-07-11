import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { GatewayService } from '../application/gateway.service';

@WebSocketGateway(3000, { cors: true })
export class GatewayGateway {
  constructor(private gatewayService: GatewayService) {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return this.gatewayService.getStatus() + ' Received: ' + data;
  }
}
