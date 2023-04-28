import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { MembershipModule } from 'src/membership/membership.module';
import { ChildModule } from 'src/child/child.module';
import { StageModule } from 'src/stage/stage.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UserModule, MembershipModule, StageModule, ChildModule],
})
export class SeedModule {}
