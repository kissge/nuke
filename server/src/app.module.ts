import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { RecordModule } from './record/record.module';
import { ProjectModule } from './project/project.module';
import { CategoryModule } from './category/category.module';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ConfigModule,
    UserModule,
    RecordModule,
    ProjectModule,
    CategoryModule,
    StatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api', method: RequestMethod.ALL });
  }
}
