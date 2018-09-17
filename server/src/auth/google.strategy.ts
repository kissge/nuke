import { Strategy } from 'passport-google-auth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, config: ConfigService) {
    super(config.GoogleOAuth);
  }

  async validate(token: string, tokenSecret: string, profile, done) {
    return await this.authService.validateUser(profile);
  }
}
