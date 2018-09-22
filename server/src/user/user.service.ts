import { HttpException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneByGoogleProfile(profile): Promise<User> {
    const email = this.findEmail(profile);
    return email && (await this.userRepository.findOne({ email }));
  }

  async register(profile): Promise<User> {
    const user = new User();
    user.name = profile.displayName;
    user.email = this.findEmail(profile);

    return await this.userRepository.save(user);
  }

  private findEmail(profile) {
    for (const { type, value } of profile.emails) {
      if (type === 'account') {
        return value;
      }
    }
  }
}
