import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT, EXPIRED_TOKEN, EXPIRED_TOKEN_CONFIRM_EMAIL } from '../core/constants';
import { plainToClass } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailService } from '../utils/email/email.service';
import { confirmEmailTemplate } from 'src/utils/email/utils/template';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
    readonly emailService: EmailService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hashSync(createUserDto.password, SALT);
    const createdUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const user = await this.userRepository.save(createdUser);
    const token = await this.generateToken(user);
    const confirmEmailToken = await this.generateConfirmEmailToken(user);

    await this.emailService.sendEmail(
      {
        to: user.email,
        subject: 'Bienvenido a Canta Juega Conmigo',
        html: confirmEmailTemplate({
          firstName: user.firstName,
          lastName: user.lastName,
          token: confirmEmailToken,
        }),
      },
    );

    return {
      user,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ user: User; token: any }> {
    const { email, password } = loginUserDto;
    const user = await this.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    const token = await this.generateToken(user);
    return { user, token };
  }

  async findOrCreate(
    body: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    let user = await this.findByEmail(body.email);
    if (!user) {
      user = await this.userRepository.create(body);
      await this.userRepository.save(user);
    }
    const token = await this.generateToken(user);
    return {
      user,
      token,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.createQueryBuilder('user').getMany();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    return plainToClass(User, updatedUser);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.userRepository.delete(id);
  }
  async confirmEmail(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.emailVerified = true;
    return this.userRepository.save(user);
  }

  async generateConfirmEmailToken(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      this.configService.get<string>('JWT_SECRET_CONFIRM_EMAIL'),
      { expiresIn: EXPIRED_TOKEN_CONFIRM_EMAIL },
    );
    return token;
  }

            

   async generateToken(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: EXPIRED_TOKEN },
    );
    return token;
  }
}
