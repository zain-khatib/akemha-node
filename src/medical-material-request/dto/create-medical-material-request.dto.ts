import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator";
import { CreateEquipmentRequestDto } from "../../equipment-request/dto/create-equipment-request.dto";
export class CreateMedicalMaterialRequestDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  appUser: boolean;

  @ApiProperty({ type: String })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ type: String })
  @IsPhoneNumber()
  @IsNotEmpty()
  alternativePhoneNumber: String;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: String;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  fatherName: String;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  motherName: String;

  @ApiProperty({ type: Date })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  identityPhotoUrl: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  doctorMedicalReportPhotoUrl: string;

  @ApiProperty({ type: () => CreateEquipmentRequestDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CreateEquipmentRequestDto)
  equipmentRequests: CreateEquipmentRequestDto[];
}
