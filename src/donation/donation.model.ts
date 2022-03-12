import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { ApiProperty } from "@nestjs/swagger";
import { DonationType } from "./enums/donation-type.enum";
import User from "../user/user.model";
import Sterilization from "../sterilization/sterilization.model";

@Table({
  scopes: {
    Donator: {
      include: {
        association: 'donator',
        attributes: {
          exclude: ['password', 'firebaseToken']
        }
      }
    }
  }
})
export default class Donation extends Model<Donation>{

  @ApiProperty({ enum: Object.values(DonationType), isArray: true })
  @Column({ type: DataType.ARRAY(DataType.ENUM(...Object.values(DonationType))) })
  type: DonationType[];

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  location: string;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, 'userId')
  donator: User;

  @ForeignKey(() => User)
  userId: number

  @ApiProperty({ type: () => Donation })
  @BelongsTo(() => Sterilization, 'sterilizationId')
  sterilization: Sterilization;

  @ForeignKey(() => Sterilization)
  sterilizationId: number;
}