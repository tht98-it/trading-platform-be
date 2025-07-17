// src/infrastructure/controllers/gateway.controller.ts
import {
  Controller,
  Get,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from '../infrastructure/guard/jwt.guard';
import { Request } from 'express';

@Controller('users')
export class UserGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserProfile(@Req() req: Request) {
    try {
      const userId = req.user?.userId; // req.user được JwtAuthGuard gắn vào
      const authHeader = req.headers.authorization || '';

      const response = await this.httpService.axiosRef.get(
        'http://localhost:8082/users/me',
        {
          headers: {
            'x-user-id': userId ?? '',
            Authorization: authHeader,
          },
          timeout: 3000, // ms
        },
      );

      return response.data; // Nest tự động serialize
    } catch (error) {
      // Log lỗi cụ thể nếu cần
      const message =
        error?.response?.data?.message || 'Failed to fetch user profile';
      const statusCode =
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(message, statusCode);
    }
  }
}
