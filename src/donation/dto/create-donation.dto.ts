import { ArrayNotEmpty, arrayNotEmpty, IsArray, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { DonationType } from "../enums/donation-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDonationDto {

  @ApiProperty({ enum: Object.values(DonationType), isArray: true })
  @IsArray()
  @IsEnum(DonationType, { each: true })
  @ArrayNotEmpty()
  type: DonationType[];

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  sterilizationId: number;
}
