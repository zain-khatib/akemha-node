import { ServiceStatus } from "../enum/service-status.enum";
import { ServiceType } from "../enum/service-type.enum";
import { ApiProperty } from "@nestjs/swagger";
import User from "../../user/user.model";
import { IsEnum, IsNotEmptyObject, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { CreateSterilizationDto } from "../../sterilization/dto/create-sterilization.dto";
import { Type } from "class-transformer";
import { CreateMedicalMaterialRequestDto } from "../../medical-material-request/dto/create-medical-material-request.dto";

export class CreateServiceDto {

  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType)
  type: ServiceType;

  @ApiProperty({ enum: ServiceStatus })
  @IsEnum(ServiceStatus)
  @IsOptional()
  status: ServiceStatus;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  assigneeId: number;

  @ApiProperty({ type: () => CreateSterilizationDto })
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateSterilizationDto)
  sterilization: CreateSterilizationDto;

  @ApiProperty({ type: () => CreateMedicalMaterialRequestDto })
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateMedicalMaterialRequestDto)
  medicalMaterialRequest: CreateMedicalMaterialRequestDto;
}
