import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import EquipmentRequest from "../equipment-request/equipment-request.model";
import Service from "../service/service.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({
  defaultScope: {
    include: ['equipmentRequests']
  }
})
export default class MedicalMaterialRequest extends Model<MedicalMaterialRequest>{

  @ApiProperty({ type: Boolean })
  @Column({ type: DataType.BOOLEAN })
  appUser: boolean;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  identityPhotoUrl: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  doctorMedicalReportPhotoUrl: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  name: String;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  fatherName: String;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  motherName: String;

  @ApiProperty({ type: Date })
  @Column({ type: DataType.DATE })
  dateOfBirth: Date;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  alternativePhoneNumber: String;

  @ApiProperty({ type: () => Service })
  @BelongsTo(() => Service, 'serviceId')
  service: Service;

  @ForeignKey(() => Service)
  serviceId: number;

  @ApiProperty({ type: () => EquipmentRequest, isArray: true })
  @HasMany(() => EquipmentRequest, 'medicalMaterialRequestId')
  equipmentRequests: EquipmentRequest[];

}