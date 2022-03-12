import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../user/enum/role.enum';
import { GetUser } from '../common/decorators/getUser.decorator';
import User from '../user/user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('tasks')
@ApiTags('Tasks')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Roles(Role.ADMIN)
  @Post()
  create(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(user, createTaskDto);
  }

  @Roles(Role.ADMIN)
  @Get('mytasks')
  findMyTasks(@GetUser() user: User) {
    return this.taskService.findAllAssignedTasks(user);
  }

  @Roles(Role.ADMIN)
  @Get('todo')
  assingedTasks(@GetUser() user: User) {
    return this.taskService.findAllToDoTasks(user);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @GetUser() user: User, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(user, id, updateTaskDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
