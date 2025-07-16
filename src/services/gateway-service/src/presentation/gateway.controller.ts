// src/infrastructure/controllers/gateway.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from '../infrastructure/guard/jwt.guard';
import { Request, Response } from 'express';
@Controller('users')
export class UserGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserProfile(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('Trigger gateway getUserProfile');

      console.log('User ID:', req.user?.userId);

      const response = await this.httpService.axiosRef.get(
        `http://localhost:8082/user/me`,
        {
          headers: {
            'x-user-id': req.user?.userId ?? '',
            Authorization: req.headers.authorization || '',
          },
        },
      );

      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  }
}
