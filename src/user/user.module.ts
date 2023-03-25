import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthMiddleware } from 'src/core/middleware/auth-token.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/update', method: RequestMethod.PATCH },
        { path: 'users/auth', method: RequestMethod.GET },
      );
  }
}
