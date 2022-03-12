import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NotificationType } from "../enum/notificationType.enum";

export class CreateNotificationDto {

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  titleEn: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  titleAr: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  bodyEn: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  bodyAr: string

  @ApiProperty({ enum: Object.values(NotificationType) })
  @IsOptional()
  type: NotificationType;
}
