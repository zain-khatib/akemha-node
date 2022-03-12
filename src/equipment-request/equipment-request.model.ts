import MedicalMaterialRequest from "../medical-material-request/medical-material-request.model";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import MedicalEquipment from "../medical-equipment/medical-equipment.model";
import { ApiProperty } from "@nestjs/swagger";

@Table
export default class EquipmentRequest extends Model<EquipmentRequest>{

  @ApiProperty({ type: Number })
  @Column({ type: DataType.INTEGER })
  quantity: number;

  @ApiProperty({ type: () => MedicalMaterialRequest })
  @BelongsTo(() => MedicalMaterialRequest, 'medicalMaterialRequestId')
  medicalMaterialRequest: MedicalMaterialRequest;

  @ForeignKey(() => MedicalMaterialRequest)
  medicalMaterialRequestId: number;


  @ApiProperty({ type: () => MedicalEquipment })
  @BelongsTo(() => MedicalEquipment, 'medicalEquipmentId')
  medicalEquipment: MedicalEquipment;

  @ForeignKey(() => MedicalEquipment)
  medicalEquipmentId: number;

}