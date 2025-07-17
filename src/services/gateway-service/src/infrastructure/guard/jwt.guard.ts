// src/infrastructure/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('[JwtAuthGuard] Error:', err);
      console.warn('[JwtAuthGuard] Info:', info);
      return null; // hoặc throw UnauthorizedException nếu bạn muốn fail hard
    }
    return user;
  }
}
