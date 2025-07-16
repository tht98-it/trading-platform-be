import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _: string, // accessToken
    __: string, // refreshToken
    profile: Profile,
  ): Promise<{
    googleId: string;
    email: string;
    name: string;
    avatar: string;
  }> {
    const { id, name, emails, photos } = profile;

    return {
      googleId: id,
      email: emails?.[0]?.value ?? '',
      name: `${name?.givenName ?? ''} ${name?.familyName ?? ''}`.trim(),
      avatar: photos?.[0]?.value ?? '',
    };
  }
}
