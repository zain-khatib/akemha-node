import { LocalizedColumn } from "../common/decorators/LocalizedColumn.decorator";
import { DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table
export default class FAQ extends Model<FAQ>{

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.TEXT })
  question: string;

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.TEXT })
  answer: string;
}