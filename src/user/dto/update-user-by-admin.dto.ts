import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import UpdateUserDto from "./updateUser.dto";

export default class UpdateUserByAdminDto extends PartialType(UpdateUserDto) {

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;
}
