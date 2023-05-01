import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { GetUser } from 'src/core/auth/decorators';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto, @GetUser() user: AuthUserDTO) {
    return this.childService.create({ ...createChildDto, user});
  }

  @Get()
  findAll() {
    return this.childService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
  //   return this.childService.update(+id, updateChildDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.childService.remove(+id);
  // }
}
