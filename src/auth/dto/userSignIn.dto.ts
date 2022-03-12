import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export default class UserSignInDto {
  @ApiProperty({ type: String })
  @IsNumberString()
  @Length(10, 10)
  nationalId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}