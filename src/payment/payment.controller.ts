import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
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
    @Param('id') id: string,
    @Res() res: Response
  ) {
     return this.paymentService.subscribe(user, id, res);

  }

  @Get('cancel')
  async cancel(
    @Req() req: Request
  ) {
    console.log(req);
    
    return req
  }
}
