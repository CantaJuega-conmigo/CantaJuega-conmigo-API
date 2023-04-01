
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from 'src/core/constants/constants';

export class CreateMembershipDto{

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

}

