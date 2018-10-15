import { Get, Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin/user')
  findAll() {
    return this.userService.findAll();
  }
}
