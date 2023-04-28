import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from './entities/child.entity';
import User from 'src/user/entities/user.entity';
import { AuthMiddleware } from 'src/core/middleware/auth-token.middleware';
import { Entity } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Child, Entity])],
  controllers: [ChildController],
  providers: [ChildService]
})
export class ChildModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/child', method: RequestMethod.POST },
      );
  }
}
