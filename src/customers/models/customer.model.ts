import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  constructor(
    id: number,
    username: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: Date,
    address: string,
  ) {
    this.id = id;
    this.name = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
  }

  @ApiHideProperty()
  public id: number;

  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  public address: string;
}
