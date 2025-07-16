// src/controllers/user.controller.ts
import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { CreateOrUpdateGoogleUserDto } from '../dto/create-or-update-google-user.dto';
import { UserService } from '../../application/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('oauth')
  async createOrUpdateGoogleUser(@Body() dto: CreateOrUpdateGoogleUserDto) {
    return this.userService.createOrUpdateGoogleUser(dto);
  }

  @Get('me')
  getProfile(@Headers('x-user-id') userId: string) {
    console.log('Pass gateway');
    console.log('User ID:', userId);
    return this.userService.findById(userId);
  }
}
