import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/role.decorator';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import { Role } from './enum/role.enum';
import UpdateUserByAdminDto from './dto/update-user-by-admin.dto';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    public service: UserService
  ) { }

  @Roles(Role.ADMIN)
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiQuery({ name: 'nationalId', type: String, required: false })
  @ApiQuery({ name: 'phoneNumber', type: String, required: false })
  @Get('admins')
  GetAdmins(
    @Query() query
  ) {
    return this.service.GetAdmins(query);
  }
  @Get(':userId')
  @ApiParam({ required: true, name: 'userId' })
  GetOne(
    @Param('userId') id
  ) {
    return this.service.getOne(id);
  }
  @Roles(Role.ADMIN)
  @Get()
  GetAll() {
    return this.service.findAll();
  }

  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(201)
  CreateOne(
    @Body() dto: CreateUserDto
  ) {
    return this.service.createOne(dto);
  }

  @Patch(':userId')
  @ApiParam({ required: true, name: 'userId' })
  UpdateOne(
    @Param('userId') id,
    @Body() dto: UpdateUserDto
  ) {
    return this.service.updateOne(id, dto);
  }

  @Roles(Role.ADMIN)
  @Patch('/admin-update/:userId')
  @ApiParam({ required: true, name: 'userId' })
  adminUpdate(
    @Param('userId') id,
    @Body() dto: UpdateUserByAdminDto
  ) {
    return this.service.updateOneByAdmin(id, dto);
  }


  @Delete(':userId')
  @ApiParam({ required: true, name: 'userId' })
  DeleteOne(
    @Param('userId') id
  ) {
    return this.service.deleteOne(id);
  }

}
