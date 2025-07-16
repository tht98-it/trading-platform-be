import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { AuthEntity } from 'src/domain/auth.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @InjectRepository(AuthEntity)
    private readonly refreshTokenRepo: Repository<AuthEntity>,
  ) {}

  async handleGoogleLogin(user: {
    googleId: string;
    email: string;
    name: string;
    avatar: string;
  }) {
    // 1. Gọi user-service để tạo/lấy user
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/users/oauth`,
      {
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    );

    const createdUser = response.data;

    // 2. Tạo token
    const accessToken = this.jwtService.sign({
      sub: createdUser.id,
      email: createdUser.email,
    });

    const refreshToken = uuidv4();

    // 3. Lưu refresh token vào DB
    await this.refreshTokenRepo.save({
      userId: createdUser.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // 4. Emit PubSub event
    this.userClient.emit('user.logged_in', {
      userId: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      avatar: createdUser.avatar,
    });

    return {
      accessToken,
      refreshToken,
      user: createdUser,
    };
  }
}
