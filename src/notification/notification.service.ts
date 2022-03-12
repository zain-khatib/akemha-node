import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { WhereOptions } from 'sequelize/types';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import Notification from './notification.model';

@Injectable()
export class NotificationService {

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      return await Notification.create(createNotificationDto as any);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return Notification.findAll({ order: [['type', 'ASC']] });
  }

  async findOne(id: number) {
    const notification = await Notification.findByPk(id);
    if (!notification)
      throw new NotFoundException('Notification Not Found');
    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    try {
      const [count, records] = await Notification.update(updateNotificationDto, { where: { id }, returning: true, individualHooks: true });
      if (count === 1) return records[0];
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return Notification.destroy({ where: { id } });
  }
}
