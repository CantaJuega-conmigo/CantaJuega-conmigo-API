import { Injectable } from '@nestjs/common';
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
    private membershipRepo: Repository<Membership>, 
    private readonly configService: ConfigService,
  ){}

  async create(createMembershipDto: CreateMembershipDto): Promise<Membership | null> {    
    const membership = this.membershipRepo.create(createMembershipDto);
    return await this.membershipRepo.save(membership);
  }

  async findAll(): Promise< Membership[] | [] > {
   return await this.membershipRepo.find();
  }

  private async findOneByDuration(duration: number): Promise<Membership | null>{
    return this.membershipRepo.findOneBy({duration});
  }

  async findOne(id: number): Promise<Membership | null> {
    return this.membershipRepo.findOneBy({id});
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto):Promise<UpdateResult> {
   return await this.membershipRepo
    .createQueryBuilder()
    .update(Membership)
    .set(updateMembershipDto)
    .where("id = :id", { id: id })
    .execute();
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.membershipRepo 
      .createQueryBuilder('membership')
      .delete()
      .from(Membership)
      .where("id = :id", { id: id })
      .execute()
  }
}
