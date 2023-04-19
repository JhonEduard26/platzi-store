import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });

    if (!category)
      throw new NotFoundException(`category ${id} no fue encontrado`);

    return category;
  }

  async create(payload: CreateCategoryDTO): Promise<void> {
    const newCategory = this.categoriesRepository.create(payload);

    await this.categoriesRepository.save(newCategory);
  }

  async update(id: number, body: UpdateCategoryDTO): Promise<void> {
    const category = await this.findOne(id);

    if (category) {
      this.categoriesRepository.merge(category, body);
      await this.categoriesRepository.save(category);
    }
  }

  async remove(id: number): Promise<void> {
    const category = this.findOne(id);

    if (category) {
      await this.categoriesRepository.delete(id);
    }
  }
}
