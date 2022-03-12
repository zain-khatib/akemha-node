import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMedicalEquipmentDto {

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  nameAr: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
