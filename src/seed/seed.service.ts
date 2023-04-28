import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from 'src/membership/entities/membership.entity';
import User from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { membershipSeed } from './data/membreship.data';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Membership)
        private readonly membershipRepository: Repository<Membership>,
    ) { }

    async runSeed() {
        await this.deleteAll();

        await this.membershipRepository.save(membershipSeed);

    }

    async deleteAll() {
        await this.membershipRepository.delete({});
        await this.userRepository.delete({});
    }
}
