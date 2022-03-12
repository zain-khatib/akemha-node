import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {
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
  @IsOptional()
  imageUrl: string;
}
