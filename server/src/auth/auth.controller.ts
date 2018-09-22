import { Get, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  callback(@Req() req, @Res() res) {
    req.login(req.user, _ => {});
    res.redirect('/');
  }
}
