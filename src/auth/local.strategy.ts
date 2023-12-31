import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validatesup(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserSup(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validatea(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserA(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
