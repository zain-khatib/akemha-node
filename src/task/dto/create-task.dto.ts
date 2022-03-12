import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  titleAr: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  descriptionAr: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  detailedAddressAr: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  detailedAddressEn: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  assigneeId: number;
}
