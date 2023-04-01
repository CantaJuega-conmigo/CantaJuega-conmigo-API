import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import User from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { MembershipModule } from './membership/membership.module';
import { Membership } from './membership/entities/membership.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PGHOST'),
        port: configService.get('PGPORT'),
        username: configService.get<string>('PGUSERNAME'),
        password: configService.get<string>('PGPASSWORD'),
        database: configService.get<string>('PGDATABASE'),
        entities:[User, Membership],
        synchronize:true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Membership]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MembershipModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
