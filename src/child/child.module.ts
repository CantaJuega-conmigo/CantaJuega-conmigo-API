import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from './entities/child.entity';
import User from 'src/user/entities/user.entity';
import { AuthMiddleware } from 'src/core/middleware/auth-token.middleware';
import { Stage } from 'src/stage/entities/stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Child, Stage])],
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
