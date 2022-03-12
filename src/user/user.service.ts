import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import User from './user.model';
import { Op } from 'sequelize';
import UpdateUserByAdminDto from './dto/update-user-by-admin.dto';

@Injectable()
export class UserService {

  async getOne(id: string): Promise<User | NotFoundException> {
    const user = await User.findByPk(id);
    if (!user)
      throw new NotFoundException('User Not Found');
    return user;
  }
  async GetAdmins(query) {
    const where: any = { role: 'admin' };
    if ('name' in query)
      where.name = { [Op.like]: `%${query.name}%` }
    if ('nationalId' in query)
      where.nationalId = { [Op.like]: `%${query.nationalId}%` }
    if ('phoneNumber' in query)
      where.phoneNumber = { [Op.like]: `%${query.phoneNumber}%` }
    return User.findAll({ where });
  }

  async updateOneByAdmin(id: string, dto: UpdateUserByAdminDto) {
    try {
      const [count, records] = await User.update(dto, { where: { id }, returning: true });
      if (count === 1) return records[0];
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async createOne(dto: CreateUserDto) {
    try {
      return await User.create(dto as User);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateOne(id: string, dto: UpdateUserDto) {
    try {
      const [count, records] = await User.update(dto, { where: { id }, returning: true });
      if (count === 1) return records[0];
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteOne(id: string) {
    return User.destroy({ where: { id } });
  }

  async findOne(where) {
    const user = await User.findOne({ where });
    if (!user)
      throw new NotFoundException('User Not Found');
    return user;

  }
  async findAll() {
    return User.findAll();
  }

  async getUsersTokens() {
    const users = await User.findAll({ where: { firebaseToken: { [Op.ne]: null } } });
    return users.map(user => user.firebaseToken);
  }
}
