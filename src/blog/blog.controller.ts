import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../common/decorators/getUser.decorator';
import { IsPublic } from '../common/decorators/publicRoute.decorator';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../user/enum/role.enum';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiBearerAuth()
@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @IsPublic()
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(
    @GetUser() user,
    @Body() createBlogDto: CreateBlogDto
  ) {
    return this.blogService.create(user, createBlogDto);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
