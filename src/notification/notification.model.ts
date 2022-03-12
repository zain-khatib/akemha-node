import { ApiProperty } from "@nestjs/swagger";
import { AfterSave, Column, DataType, Table, Model, BeforeSave } from "sequelize-typescript";
import { LocalizedColumn } from "../common/decorators/LocalizedColumn.decorator";
import { NotificationType } from "./enum/notificationType.enum";
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import User from "../user/user.model";
import { Op } from "sequelize";
import { Locals } from "../common/enums/locals.enum";
import { Body } from "@nestjs/common";


@Table
export default class Notification extends Model<Notification>{

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.STRING })
  title: string

  @ApiProperty({ type: String })
  @LocalizedColumn({ type: DataType.TEXT })
  body: string;

  @ApiProperty({ enum: Object.values(NotificationType) })
  @Column({
    type: DataType.ENUM(...Object.values(NotificationType)),
    defaultValue: NotificationType.CREATED
  })
  type: NotificationType;

  @ApiProperty({ type: Date })
  @Column({ type: DataType.DATE })
  sendAt: Date;

  @BeforeSave
  static async sendNotification(notification: Notification) {

    notification.sendAt = new Date();

    if (!notification.changed('type') || notification.type !== NotificationType.PUBLISHED)
      return;

    const users = await User.findAll();
    const firebaseTokens = { 'ar': [], 'en': [] };
    users.forEach(token => {
      firebaseTokens[token.language].push(token.firebaseToken)
    });

    Object.values(Locals).map(async (local) => {
      const messages = {
        notification: {
          title: notification.get(`${_.camelCase(`title ${local}`)}`) as string,
          body: notification.get(`${_.camelCase(`body ${local}`)}`) as string
        },
        tokens: firebaseTokens[local]
      };
      await admin.messaging().sendMulticast(messages);
    })
  }

}