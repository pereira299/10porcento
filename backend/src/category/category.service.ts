import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private currentCategoryId: number;

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository
      .save(createCategoryDto)
      .then((res) => {
        return res;
      })
      .catch(() => {
        return false;
      });
  }

  async selectCategory() {
    const itens = await this.categoryRepository.find({
      order: {
        used_at: 'DESC',
      },
      take: 4,
    });
    const index = ((Math.random() * 10) % 3).toFixed(0);
    const selected = itens[parseInt(index)];
    this.currentCategoryId = selected.id;
    return selected;
  }

  async getCurrentCategory() {
    return await this.categoryRepository.findOne({
      where: {
        id: this.currentCategoryId,
      },
    });
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository
      .update({ id }, updateCategoryDto)
      .then((res) => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async remove(id: number) {
    return await this.categoryRepository
      .delete({ id })
      .then((res) => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
