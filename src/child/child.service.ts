import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Child } from './entities/child.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { Stage } from 'src/stage/entities/stage.entity';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}
  async create(createChildDto: CreateChildDto) {
    const user = await this.userRepository.findOne({
      where: { id: createChildDto.user.id },
      relations: ['child'],
    });

    if (user.child) throw new BadRequestException('User already has a child');

    const child = await this.childRepository.create(createChildDto);
    child.user = user;
    await child.calculateAgeInMonths();
    const stage = await this.stageRepository
      .createQueryBuilder('stage')
      .where(':age >= stage.minAge AND :age < stage.maxAge', {
        age: child.age,
      })
      .orderBy('stage.maxAge', 'DESC')
      .getOne();
    child.stage =
      stage ||
      (await this.stageRepository.findOne({ order: { maxAge: 'DESC' } }));

    return this.childRepository.save(child);
  }

  async findAll() {
    return this.childRepository.find({
      relations: ['user', 'stage'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} child`;
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return `This action updates a #${id} child`;
  }

  remove(id: number) {
    return `This action removes a #${id} child`;
  }
}
