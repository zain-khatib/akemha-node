import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isFinished: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isFinishedConfirmation: boolean;
}
