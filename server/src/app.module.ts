import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
