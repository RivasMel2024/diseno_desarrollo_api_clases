import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: {
      id: string;
      emails: { value: string }[];
      displayName: string;
    },
    done: VerifyCallback,
  ): void {
    const { id, emails, displayName } = profile;
    const email = emails?.[0]?.value;

    if (!email || !displayName) {
      done(new Error('Perfil de Google incompleto'), false);
      return;
    }

    done(null, {
      googleId: id,
      email,
      name: displayName,
    });
  }
}
