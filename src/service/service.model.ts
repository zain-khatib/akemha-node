import MedicalMaterialRequest from "../medical-material-request/medical-material-request.model";
import { BelongsTo, Column, DataType, Table, Model, HasOne, ForeignKey } from "sequelize-typescript";
import Sterilization from "../sterilization/sterilization.model";
import { ServiceStatus } from "./enum/service-status.enum";
import { ServiceType } from "./enum/service-type.enum";
import { ApiProperty } from "@nestjs/swagger";
import User from "../user/user.model";

@Table({
  defaultScope: {
    include: [
      {
        association: 'requester',
        attributes: {
          exclude: ['firebaseToken', 'password']
        }
      },
      {
        association: 'assignee',
        attributes: {
          exclude: ['firebaseToken', 'password']
        }
      },
      'sterilization', 'medicalMaterialRequest'
    ]
  }
})
export default class Service extends Model<Service>{
  @ApiProperty({ enum: ServiceType })
  @Column({ type: DataType.ENUM(...Object.values(ServiceType)) })
  type: ServiceType;

  @ApiProperty({ enum: ServiceStatus })
  @Column({
    type: DataType.ENUM(...Object.values(ServiceStatus)),
    defaultValue: ServiceStatus.PENDING
  })
  status: ServiceStatus;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, 'requesterId')
  requester: User;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, 'assigneeId')
  assignee: User;

  @ForeignKey(() => User)
  assigneeId: number;

  @ForeignKey(() => User)
  requesterId: number;

  @ApiProperty({ type: () => Sterilization })
  @HasOne(() => Sterilization, 'serviceId')
  sterilization: Sterilization;

  @ApiProperty({ type: () => MedicalMaterialRequest })
  @HasOne(() => MedicalMaterialRequest)
  medicalMaterialRequest: MedicalMaterialRequest;

}