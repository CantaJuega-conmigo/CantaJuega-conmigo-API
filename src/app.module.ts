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
import { SeedModule } from './seed/seed.module';
import { EmailModule } from './utils/email/email.module';
import { ChildModule } from './child/child.module';
import { Child } from './child/entities/child.entity';
import { Stage } from './stage/entities/stage.entity';
import { StageModule } from './stage/stage.module';

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
        entities:[User, Membership, Child, Stage],
        synchronize:true,
        // dropSchema: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Membership, Child, Stage]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MembershipModule,
    EmailModule,
    SeedModule,
    ChildModule,
    StageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
