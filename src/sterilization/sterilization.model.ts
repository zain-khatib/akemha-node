import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import Donation from "../donation/donation.model";
import Service from "../service/service.model";

@Table({
  defaultScope: {
    include: ['donation']
  }
})
export default class Sterilization extends Model<Sterilization>{

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.TEXT })
  address: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.TEXT })
  notes: string;

  @ApiProperty({ type: Date })
  @Column({ type: DataType.DATE })
  requestDate: Date;

  @ApiProperty({ type: Date })
  @Column({ type: DataType.DATE })
  serviceDate: Date;

  @ApiProperty({ type: () => Service })
  @BelongsTo(() => Service, 'serviceId')
  service: Service;

  @ForeignKey(() => Service)
  serviceId: number;

  @ApiProperty({ type: () => Donation })
  @HasOne(() => Donation, 'sterilizationId')
  donation: Donation;
}