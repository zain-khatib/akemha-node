import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NotificationType } from "../enum/notificationType.enum";


export class UpdateNotificationDto {

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  titleEn: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  titleAr: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bodyEn: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bodyAr: string

  @ApiProperty({ enum: Object.values(NotificationType) })
  @IsIn(Object.values(NotificationType))
  @IsOptional()
  type: NotificationType;
}
