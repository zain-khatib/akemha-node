import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
export class CreateEquipmentRequestDto {

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  medicalEquipmentId: number;
}