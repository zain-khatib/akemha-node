import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";

export default class UserRegisterDto {
  @ApiProperty({ type: String })
  @IsNumberString()
  @Length(10, 10)
  nationalId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  adminSecret: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  firebaseToken: string;
}