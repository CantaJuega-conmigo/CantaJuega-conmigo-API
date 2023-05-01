import { Controller, Get } from '@nestjs/common';
import { StageService } from './stage.service';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get()
  async findAll() {
    return await this.stageService.findAll();
  }
}
