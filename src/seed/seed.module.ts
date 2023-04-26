import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { MembershipModule } from 'src/membership/membership.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UserModule, MembershipModule],
})
export class SeedModule {}
