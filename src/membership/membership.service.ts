import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership) 
    private membershipRepository: Repository<Membership>, 
    private readonly configService: ConfigService,
  ){}

  async create(createMembershipDto: CreateMembershipDto): Promise<Membership | null> {    
    const membership = this.membershipRepository.create(createMembershipDto);
    return this.membershipRepository.save(membership);
  }

  async findAll(): Promise< Membership[] | [] > {
   return this.membershipRepository.find();
  }

  async findOneByDuration(duration: number): Promise<Membership | null>{
    return this.membershipRepository.findOneBy({duration});
  }

  async findOne(id: string): Promise<Membership | null> {
    const membership = await this.membershipRepository.findOne({where: {id}});
    if(!membership)
      throw new NotFoundException('Membership not found');
    return membership;
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto):Promise<UpdateResult> {
    return this.membershipRepository.update(id,updateMembershipDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.membershipRepository 
      .createQueryBuilder('membership')
      .delete()
      .from(Membership)
      .where("id = :id", { id: id })
      .execute()
  }
}
