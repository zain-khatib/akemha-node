import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import FAQ from './faq.model';

@Injectable()
export class FaqService {
  async create(createFaqDto: CreateFaqDto) {
    try {
      const faq = await FAQ.create(createFaqDto as any);
      return FAQ.findByPk(faq.id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return FAQ.findAll();
  }

  async findOne(id: number) {
    const faq = await FAQ.findByPk(id);
    if (!faq)
      throw new NotFoundException('FAQ Not Found');
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    try {
      const [count, records] = await FAQ.update(updateFaqDto as any, { where: { id }, returning: true });
      if (count === 1) return FAQ.findByPk(records[0].id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return FAQ.destroy({ where: { id } });
  }
}
