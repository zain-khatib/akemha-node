import { LocalizedColumn } from "../common/decorators/LocalizedColumn.decorator";
import EquipmentRequest from "../equipment-request/equipment-request.model";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table
export default class MedicalEquipment extends Model<MedicalEquipment>{

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.STRING })
  name: string;

  @ApiProperty({ type: Boolean })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive: boolean;

  @ApiProperty({ type: () => EquipmentRequest, isArray: true })
  @HasMany(() => EquipmentRequest, 'medicalEquipmentId')
  equipmentRequests: EquipmentRequest[];
}