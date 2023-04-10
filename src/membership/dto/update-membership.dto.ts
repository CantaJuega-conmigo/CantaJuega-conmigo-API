import { PartialType } from '@nestjs/mapped-types';
import { CreateMembershipDto } from './create-membership.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/core/constants/constants';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {

  @ApiProperty({
    type:'enum',
    description:'status of membership',
    enum:Status,
  })
  @IsEnum(Status)
  status:Status

  @ApiProperty({
    type:'number',
    description:'price of membership',
  })
  @IsNumber()
  price: number;
}
