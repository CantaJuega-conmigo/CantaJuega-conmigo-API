import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { Child } from 'src/child/entities/child.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Stage, Child])],
  controllers: [StageController],
  providers: [StageService],
  exports: [TypeOrmModule]
})
export class StageModule {}
