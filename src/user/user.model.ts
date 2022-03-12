import { BeforeSave, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { LocalizedColumn } from "../common/decorators/LocalizedColumn.decorator";
import Donation from "../donation/donation.model";
import { Locals } from "../common/enums/locals.enum";
import { ApiProperty } from "@nestjs/swagger";
import Blog from "../blog/blog.model";
import Task from "../task/task.model";
import { Role } from "./enum/role.enum";
import * as bcrypt from 'bcrypt';
import Service from "../service/service.model";

@Table
export default class User extends Model<User> {

  @ApiProperty({ type: String })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  nationalId: string;

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  phoneNumber: string;

  @ApiProperty({ type: String })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ enum: Object.values(Role) })
  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.CUSTOMER
  })
  role: Role

  @ApiProperty({ type: String })
  @Column({
    type: DataType.STRING,
  })
  fatherName: string;

  @ApiProperty({ type: String })
  @Column({
    type: DataType.STRING,
  })
  motherName: string;

  @ApiProperty({ type: Date })
  @Column({ type: DataType.DATE })
  dateOfBirth: Date;

  @ApiProperty({ type: String })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ type: String })
  @Column({
    type: DataType.TEXT,
  })
  address: string;

  @ApiProperty({ enum: Object.values(Locals) })
  @Column({
    type: DataType.ENUM(...Object.values(Locals)),
    defaultValue: Locals.ar
  })
  language: Locals

  @ApiProperty({ type: String })
  @Column({ type: DataType.STRING })
  firebaseToken: string;

  @ApiProperty({ type: () => Blog, isArray: true })
  @HasMany(() => Blog, 'userId')
  blogs: Blog[];

  @ApiProperty({ type: () => Donation })
  @HasMany(() => Donation, 'userId')
  donations: Donation[];

  @ApiProperty({ type: () => Task, isArray: true })
  @HasMany(() => Task, 'assigneeId')
  assignedTasks: Task[];

  @ApiProperty({ type: () => Task, isArray: true })
  @HasMany(() => Task, 'assignorId')
  toDoTasks: Task[];

  @ApiProperty({ type: () => Service, isArray: true })
  @HasMany(() => Service, 'requesterId')
  serviceRequests: Service[];

  @ApiProperty({ type: () => Service, isArray: true })
  @HasMany(() => Service, 'assigneeId')
  assignedServices: Service[];

  async isValidPassword(oldPassword: string) {
    return bcrypt.compare(oldPassword, this.password);
  }

  toJSON() {
    const json = Object.assign({}, this.get());
    delete json.password;
    return json;
  }

  @BeforeSave
  static async hashPassword(user: User): Promise<void> {
    if (user.password && user.changed('password')) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.set('password', hashedPassword);
    }
  }
}