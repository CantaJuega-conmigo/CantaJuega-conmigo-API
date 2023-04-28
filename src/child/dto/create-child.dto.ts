import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxDate } from 'class-validator';
import { getDate } from 'date-fns';
import { Gender } from 'src/core/constants';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';

export class CreateChildDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  @MaxDate(new Date(getDate(new Date()) - 1))
  @IsDateString()
  birthDate: string;

  @IsOptional()
  user?: AuthUserDTO;
}


export default CreateChildDto;