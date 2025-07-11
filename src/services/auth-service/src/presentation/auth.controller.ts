import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../application/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAuthStatus(): string {
    return this.authService.getStatus();
  }

  @Post('google')
  async googleLogin(@Body() body: any): Promise<any> {
    return this.authService.googleLogin(body.code);
  }
}
