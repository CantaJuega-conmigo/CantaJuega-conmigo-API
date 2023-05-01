import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './utils/email.dto';


@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
        private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get('EMAIL'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(props : EmailDto) {
    const { to, subject, html } = props;
    const mailOptions = {
      from: this.configService.get('EMAIL'),
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }

}