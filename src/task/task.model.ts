import { LocalizedColumn } from "../common/decorators/LocalizedColumn.decorator";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import User from "../user/user.model";

@Table({
  defaultScope: {
    include: [{
      association: 'assignee',
      attributes: {
        exclude: ['firebaseToken', 'password']
      }
    },
    {
      association: 'assignor',
      attributes: {
        exclude: ['firebaseToken', 'password']
      }
    }]
  }
})
export default class Task extends Model<Task> {

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.STRING })
  title: string;

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.TEXT })
  description: string;

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.TEXT })
  detailedAddress: string;

  @ApiProperty({ type: Boolean })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isFinished: boolean;

  @ApiProperty({ type: Boolean })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isFinishedConfirmation: boolean;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, 'assigneeId')
  assignee: User;

  @ForeignKey(() => User)
  assigneeId: number;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, 'assignorId')
  assignor: User;

  @ForeignKey(() => User)
  assignorId: number;

}
