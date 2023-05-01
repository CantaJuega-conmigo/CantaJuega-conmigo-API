import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';
import { Membership } from 'src/membership/entities/membership.entity';
import User from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { Payment } from './entities/payment.entity';
import { PAYMAENT_STATUS } from 'src/core/constants/constants';

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
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly httpService: HttpService,
  ) {}

  async subscribe(user: AuthUserDTO, id: string) {
    const membership = await this.membershipRepository.findOne({
      where: { id },
    });
    const userDB = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userDB || !membership) throw new NotFoundException('User not found');

    if (!userDB.recurrenteId) {
      try {
        const recurrenteUser : RecurrenteUserCreate = await this.httpService
          .post(
            'https://app.recurrente.com/api/users',
            {
              email: userDB.email,
              full_name: `${userDB.firstName} ${userDB.lastName}`,
            },
            this.RequestHeader,
          ) .pipe(
            map((response) => response.data),
            catchError((error: AxiosError) => {
              console.error(error.message);
              throw new Error('Failed to create Recurrente user');
            }),
          )
          .toPromise();
        

        userDB.recurrenteId = recurrenteUser.id as string;
        await this.userRepository.save(userDB);
      } catch (error) {
        throw new Error('Failed to create Recurrente user');
      }
    }

    const requestBody = {
      items: [
        { price_id: membership.recurrenteId, user_id: userDB.recurrenteId },
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

      await this.paymentRepository.save({
        user: userDB,
        membership,
        checkoutId: checkout.id,
        status: PAYMAENT_STATUS.pending,
        recurrenteId: checkout.id,
        checkout_url: checkout.checkout_url,
        dateOfCreation: new Date(),
        });

    return checkout.checkout_url;
  }

  async cancel() {
    return 'Payment cancelled!';
  }

  private readonly RequestHeader = {
    headers: {
      'Content-Type': 'application/json',
      'X-PUBLIC-KEY': process.env.RECURRENTE_PUBLIC_KEY,
      'X-SECRET-KEY': process.env.RECURRENTE_PRIVATE_KEY,
    },
  };
}
