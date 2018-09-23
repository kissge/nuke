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
        if (req.path.substr(0, 6) === '/admin' && !req.user.isAdmin) {
          throw new HttpException('You do not have privilege', 403);
        } else {
          next();
        }
      } else {
        throw new HttpException('Login required', 401);
      }
    };
  }
}
