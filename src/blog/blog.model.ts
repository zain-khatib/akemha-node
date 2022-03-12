import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { LocalizedColumn } from "../common/decorators/LocalizedColumn.decorator";
import { ApiProperty } from "@nestjs/swagger";
import User from "../user/user.model";

@Table({
  defaultScope: {
    include: [{
      association: 'author',
      attributes: ['name']
    }]
  }
})
export default class Blog extends Model<Blog>{

  @ApiProperty({ type: String })
  @LocalizedColumn({
    type: DataType.STRING,
    allowNull: false
  })
  title: string;

  @ApiProperty({ type: String })
  @LocalizedColumn({
    type: DataType.TEXT,
    allowNull: false
  })
  description: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  imageUrl;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, 'userId')
  author: User;

  @ForeignKey(() => User)
  userId: number;
}