import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from './entities/child.entity';
import User from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Child])],
  controllers: [ChildController],
  providers: [ChildService]
})
export class ChildModule {}
