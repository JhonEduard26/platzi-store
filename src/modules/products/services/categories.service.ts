import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category {
    const category = this.categories.find((item) => item.id === id);

    if (!category)
      throw new NotFoundException(`category ${id} no fue encontrado`);

    return category;
  }

  create(payload: CreateCategoryDTO): void {
    this.counterId++;

    const newCategory = {
      id: this.counterId,
      ...payload,
    };

    this.categories.push(newCategory);
  }

  update(id: number, body: UpdateCategoryDTO): void {
    const category = this.findOne(id);

    if (category) {
      const categoryIndex = this.categories.findIndex((item) => item.id === id);
      this.categories[categoryIndex] = {
        id,
        ...category,
        ...body,
      };
    }
  }

  delete(id: number): void {
    const category = this.findOne(id);

    if (category) {
      const categoryIndex = this.categories.findIndex((item) => item.id === id);
      this.categories.splice(categoryIndex, 1);
    }
  }
}
