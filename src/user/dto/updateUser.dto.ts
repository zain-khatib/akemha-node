import { IsDateString, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, isString, IsString, Length } from "class-validator";
import { Locals } from "../../common/enums/locals.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/role.enum";

export default class UpdateUserDto {
  @ApiProperty({ type: String })
  @IsNumberString()
  @Length(10, 10)
  @IsOptional()
  nationalId: string;

  @ApiProperty({ type: String })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  fatherName: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  motherName: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  address: string;
}