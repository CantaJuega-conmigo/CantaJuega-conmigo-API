import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from 'src/membership/entities/membership.entity';
import User from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { membershipSeed } from './data/membreship.data';
import { Child } from 'src/child/entities/child.entity';
import { userSeed } from './data/user.data';
import { childSeed } from './data/child.data';
import { Stage } from 'src/stage/entities/stage.entity';
import { stageSeed } from './data/stage.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}

  async runSeed() {
    await this.deleteAll();

    const allMembreship = await this.membershipRepository.save(membershipSeed);
    const allUser = await this.userRepository.save(userSeed);
    const allStage = await this.stageRepository.save(stageSeed);
    const allChild = await childSeed.map(async (data, index) => {
      const child = this.childRepository.create(data);
      await child.calculateAgeInMonths();
      child.user = allUser[index];
      console.log(child.age);

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

      return await this.childRepository.save(child);
    });
  }

  async deleteAll() {
    await this.membershipRepository.delete({});
    await this.userRepository.delete({});
    await this.childRepository.delete({});
    await this.stageRepository.delete({});
  }
}
