import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import User from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './utils/GoogleStrategy';


@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [
    AuthService,
    GoogleStrategy,
    UserService,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
