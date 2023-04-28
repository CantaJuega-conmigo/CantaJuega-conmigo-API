import { ConfigService } from "@nestjs/config";
import { DocumentBuilder } from "@nestjs/swagger";

export const SALT = 10;
export const EXPIRED_TOKEN = '1d';
export const EXPIRED_TOKEN_CONFIRM_EMAIL = '1h';

// export const cloudinaryConfig = {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   };
  export const swaggerConfig = new DocumentBuilder()
    .setTitle('CantaJuegaConmigo Api')
    .setDescription('The CantaJuegaConmigo Api description')
    .setVersion('1.0')
    .addTag('CantaJuegaConmigo Api')
    .build();
  
export enum Status {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  CANCELED = 'canceled',
  PAUSED = 'paused',
}
export enum TOKEN_KEY {
  auth = 'JWT_SECRET',
  confirmEmail = 'JWT_SECRET_CONFIRM_EMAIL',
  reset="JWT_SECRET_RESET_PASSWORD"
  // refresh = 'refresh',
}

export enum Gender {
  male,
  female,
  NonBinary,
  other,
}
