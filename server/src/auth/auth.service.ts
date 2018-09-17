import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(profile) {
    const user = await this.userService.findOneByGoogleProfile(profile);

    if (user) {
      return user;
    } else {
      throw new HttpException('Only invited users can access', 401);
    }
  }
}
