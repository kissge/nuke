import { HttpException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByGoogleProfile(profile): Promise<User> {
    const email = this.findEmail(profile);
    if (email) {
      const user = await this.userRepository.findOne({ email });
      if (user && !user.name) {
        this.register(user, profile);
      }

      return user;
    }

    return null;
  }

  async register(user, profile): Promise<User> {
    user.name = profile.displayName;
    user.email = this.findEmail(profile);
    user.avatar = profile.image && profile.image.url;

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
