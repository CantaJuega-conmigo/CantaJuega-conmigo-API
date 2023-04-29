import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { Membership } from 'src/membership/entities/membership.entity';
import { AuthMiddleware } from 'src/core/middleware/auth-token.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User,Membership]), HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'payment/subscribe/:id', method: RequestMethod.GET },
      );
  }
}
