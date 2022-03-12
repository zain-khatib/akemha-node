import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ServiceStatus } from '../enum/service-status.enum';

export class UpdateServiceDto {

  @ApiProperty({ enum: ServiceStatus })
  @IsEnum(ServiceStatus)
  @IsOptional()
  status: ServiceStatus;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  assigneeId: Number;
}
