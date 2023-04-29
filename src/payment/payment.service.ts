import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';
import { Membership } from 'src/membership/entities/membership.entity';
import User from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';

interface RecurrenteUserCreate {
  id: string;
  email: string;
}
interface RecurrenteCheckoutCreate {
  id: string;
  checkout_url: string;
}

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async subscribe(user: AuthUserDTO, id: string, res: Response) {
    const membershipDB = await this.membershipRepository.findOne({
      where: { id },
    });
    const userDB = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userDB || !membershipDB) throw new NotFoundException('User not found');

    if (!userDB.recurrenteId) {
      try {
        const recurrenteUser: RecurrenteUserCreate = await this.httpService
          .post(
            'https://app.recurrente.com/api/users',
            {
              email: userDB.email,
              full_name: `${userDB.firstName} ${userDB.lastName}`,
            },
            this.RequestHeader,
          )
          .pipe(
            map((response) => response.data),
            catchError((error: AxiosError) => {
              console.error(error.message);
              throw new Error('Failed to create Recurrente user');
            }),
          )
          .toPromise();

        userDB.recurrenteId = recurrenteUser.id;
        await this.userRepository.save(userDB);
      } catch (error) {
        console.error(error.message);
        throw new Error('Failed to create Recurrente user');
      }
    }

    const requestBody = {
      items: [
        { price_id: membershipDB.recurrenteId, user_id: userDB.recurrenteId },
      ],
    };

    const checkout : RecurrenteCheckoutCreate = await this.httpService
      .post(
        'https://app.recurrente.com/api/checkouts',
        requestBody,
        this.RequestHeader,
      )
      .pipe(
        map((response) => response.data),
        catchError((error: AxiosError) => {
          console.error(error.message);
          throw new Error('Failed to create Recurrente user');
        }),
      )
      .toPromise();

    return res.redirect(checkout.checkout_url);
  }

  async cancel() {
    return 'Payment cancelled!';
  }

  private readonly RequestHeader = {
    headers: {
      'Content-Type': 'application/json',
      'X-PUBLIC-KEY': process.env.RECURRENTE_PUBLIC_KEY,
      'X-SECRET-KEY': process.env.RECURRENTE_SECRET_KEY,
    },
  };
}
