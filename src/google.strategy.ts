import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallBack } from 'passport-google-oauth20';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '928623955114-2kmslrnpfvbp5t608j4jk2t74h8t4ij3.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4000/auth/gooogle/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallBack,
  ): Promise<any> {
    const { name } = profile;
    console.log(name);
    done(null, 'test');
  }
}
