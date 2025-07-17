// src/infrastructure/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => {
          const token = req?.cookies?.accessToken;
          console.log('[Extractor] accessToken:', token);
          return token;
        },
      ]),
      secretOrKey:
        config.get('JWT_SECRET') ||
        '2c06ac173506ef271cad8d8cba4424452963761a1f6a04043d023805da6dad5c',
    });
  }

  async validate(payload: any) {
    console.log('[JwtStrategy] Validated payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
