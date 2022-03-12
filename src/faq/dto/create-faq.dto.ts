import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFaqDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  questionAr: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  questionEn: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  answerAr: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  answerEn: string;
}
