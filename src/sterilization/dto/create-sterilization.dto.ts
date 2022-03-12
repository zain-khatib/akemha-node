import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator";
import { CreateDonationDto } from "../../donation/dto/create-donation.dto";

export class CreateSterilizationDto {

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @ApiProperty({ type: String })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  notes: string;

  @ApiProperty({ type: () => CreateDonationDto })
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDonationDto)
  donation: CreateDonationDto;
}