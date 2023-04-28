import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthMiddleware } from 'src/core/middleware/auth-token.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { EmailService } from '../utils/email/email.service';
import { Child } from 'src/child/entities/child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Child])],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user/update', method: RequestMethod.PATCH },
        { path: 'user/auth', method: RequestMethod.GET },
      );
  }
}
