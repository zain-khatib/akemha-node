import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import User from '../user/user.model';
import Task from './task.model';
import Blog from '../blog/blog.model';

@Injectable()
export class TaskService {
  async create(user: User, createTaskDto: CreateTaskDto) {
    try {
      const task = await Task.create({ ...createTaskDto, assignorId: user.id } as any);
      return Task.findByPk(task.id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }
  async findAllAssignedTasks(user: User) {
    return Task.findAll({ where: { assignorId: user.id } });
  }
  async findAllToDoTasks(user: User) {
    return Task.findAll({ where: { assigneeId: user.id } });
  }

  async findAll() {
    return Task.findAll();
  }

  async findOne(id: string) {
    const task = await Task.findByPk(id);
    if (!task)
      throw new NotFoundException('Task Not Found');
    return task;
  }

  async update(user: User, id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await Task.findByPk(id);
      if (!task) throw new NotFoundException('Task Not Found');
      if (
        !task.isFinishedConfirmation &&
        updateTaskDto.isFinishedConfirmation &&
        task.assignorId !== user.id
      )
        throw new ForbiddenException('Only task assignor can confirm if its done or not')
      await task.update(updateTaskDto);
      return task;
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    return Blog.destroy({ where: { id } });
  }
}
