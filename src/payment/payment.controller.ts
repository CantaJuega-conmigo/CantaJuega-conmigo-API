import { Controller, Get, Param, ParseUUIDPipe, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import { GetUser } from 'src/core/auth/decorators';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('subscribe/:id')
  async subscribe(
    @GetUser() user: AuthUserDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
     return await this.paymentService.subscribe(user, id);
  }

  @Get('cancel')
  async cancel(
    @Req() req: Request
  ) {
    console.log(req.headers.location);
    console.log(req.headers.origin);
    console.log(req.authInfo);
    console.log(req.originalUrl);
    
    return await this.paymentService.cancel();
    
  }

  @Get()
  async getPayments()
  {
    return await this.paymentService.getPayments();
  }
}
