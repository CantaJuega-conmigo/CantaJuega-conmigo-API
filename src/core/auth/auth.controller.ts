import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from 'src/user/user.service';
import { GetUser } from './decorators';
import { AuthUserDTO } from './dto/auth-user.dto';
import { AuthService } from './auth.service';
import { TOKEN_KEY } from '../constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService
   ){}


 @Get('google')
 @UseGuards(AuthGuard('google'))
 async googleLogin():Promise<any>{
    return httpStatus.OK;
 }
 @Get('google/callback')
 @UseGuards(AuthGuard('google'))
 async googleLoginRedirect(@Req() req:Request & { user?: any },@Res() res:Response):Promise<any>{
   const {user, token} = await this.userService.findOrCreate(req.user);
   return res.redirect(`${process.env.FRONT_URL}?token=${token}`)
 }

 @Get('confirm-email')
  async confirmEmail(@Req() req:Request, @Res() res:Response):Promise<any>{
    const token = req.query.auth;
    const user = await this.authService.decodeToken(token as string, TOKEN_KEY.confirmEmail);
    await this.userService.confirmEmail(user.id);
    return res.redirect(`${process.env.FRONT_URL}`)
  }

 @Get('refresh')
 async refresh(@GetUser() user: AuthUserDTO) {
   const userDB = await this.userService.findOne(user.id);
   return await this.userService.generateToken(userDB);
 }
}