import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException,
  BadRequestException, 
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ApiTags } from '@nestjs/swagger';
import { Membership } from './entities/membership.entity';

@ApiTags('membership')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  async create(@Body() createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const membershipExist: Membership | null = await this.membershipService.findOneByDuration(createMembershipDto.duration);
    if(membershipExist)
      throw new BadRequestException('There is already a membership with that duration');
    return await this.membershipService.create(createMembershipDto);
  }

  @Get()
  async findAll(): Promise< Membership[] | [] > {
    return await this.membershipService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Membership> {
    const membership: Membership | null = await this.membershipService.findOne(+id);
    if(!membership)
      throw new NotFoundException('Membership not found');
    return membership;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMembershipDto: UpdateMembershipDto): Promise<string> {
    const membershipUpdated =  await this.membershipService.update(+id, updateMembershipDto);
    if(membershipUpdated.affected === 0)
      throw new NotFoundException('Membership not found');
    return 'Membership successfully updated';
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    const membershipDeleted = await this.membershipService.remove(+id);
    if(membershipDeleted.affected === 0)
      throw new NotFoundException('Membership not found');
    return 'Membership successfully deleted';
  }
}
