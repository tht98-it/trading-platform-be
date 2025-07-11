import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getStatus(): string {
    return 'Gateway is running!';
  }
}
