import { Injectable } from '@nestjs/common';
import { AuthUserDTO } from './dto/auth-user.dto';
import * as jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants';

@Injectable()
export class AuthService {
  constructor() {}

  async decodeToken(token: string, type: TOKEN_KEY): Promise<AuthUserDTO> {
    const user = await jwt.verify(token, process.env[type]);
    if (!user) {
      throw new Error('Invalid token');
    }
    return user as AuthUserDTO;
  }
}
