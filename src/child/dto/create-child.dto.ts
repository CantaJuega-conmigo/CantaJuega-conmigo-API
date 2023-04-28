import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxDate, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Gender } from 'src/core/constants';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ name: 'notFutureDate', async: false })
export class NotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(birthDate: Date) {
    const now = new Date();
    return birthDate.getTime() <= now.getTime();
  }

  defaultMessage() {
    return 'Date cannot be in the future';
  }
}

export class CreateChildDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender: Gender;

  @Transform(({ value }: { value: string }) => {
    // const dateString = value.split('/');
    // return new Date(`${dateString[1]}/${dateString[0]}/${dateString[2]}`);
    return new Date(value);
  })
  @IsDate()
  @IsNotEmpty()
  @Validate(NotFutureDateConstraint)
  birthDate: Date;

  @IsOptional()
  user?: AuthUserDTO;
}


export default CreateChildDto;