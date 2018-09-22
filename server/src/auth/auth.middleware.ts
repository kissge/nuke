import {
  HttpException,
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.user) {
        next();
      } else {
        throw new HttpException('Login required', 401);
      }
    };
  }
}
