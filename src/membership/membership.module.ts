import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Membership, Payment])],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService, TypeOrmModule]
})
export class MembershipModule {}
