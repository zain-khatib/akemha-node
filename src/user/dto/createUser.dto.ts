import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../enum/role.enum";

export default class UserRegisterDto {
  @ApiProperty({ type: String })
  @IsNumberString()
  @Length(10, 10)
  nationalId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Object.values(Role) })
  @IsIn(Object.values(Role))
  @IsOptional()
  role: Role

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  firebaseToken: string;
}