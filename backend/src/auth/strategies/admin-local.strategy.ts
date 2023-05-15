import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SessionAdminUser } from 'src/interfaces/session-admin-user';
import ErrorMessages from 'src/enums/error-messages.enum';

export const name = 'LOCAL_ADMIN';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, name) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user: SessionAdminUser =
      await this.authService.validateAdminCredentials(username, password);

    if (!user) {
      throw new UnauthorizedException(
        ErrorMessages.INVALID_USERNAME_OR_PASSWORD,
      );
    }

    return user;
  }
}
