import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from '../application/user.service';

@Controller()
export class UserListener {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user.google_logged_in')
  async handleGoogleLogin(@Payload() payload: any) {
    await this.userService.createOrUpdateGoogleUser({
      googleId: payload.googleId,
      email: payload.email,
      name: payload.name,
      avatar: payload.avatar,
    });
  }
}
