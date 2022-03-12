import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import User from '../user/user.model';
import Blog from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {

  async findOne(id: string) {
    const blog = await Blog.findByPk(id);
    if (!blog)
      throw new NotFoundException('Blog Not Found');
    return blog;
  }

  async findAll() {
    return Blog.findAll();
  }

  async create(user: User, createBlogDto: CreateBlogDto) {
    try {
      const blog = await Blog.create({ ...createBlogDto, userId: user.id } as any);
      return Blog.findByPk(blog.id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const [count, records] = await Blog.update(updateBlogDto, { where: { id }, returning: true });
      if (count === 1) return Blog.findByPk(records[0].id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    return Blog.destroy({ where: { id } });
  }
}
