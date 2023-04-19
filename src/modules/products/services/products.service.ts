import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly brandsService: BrandsService,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        brand: true,
        categories: true,
      },
    });

    if (!product)
      throw new NotFoundException(`Producto ${id} no fue encontrado`);

    return product;
  }

  async create(payload: CreateProductDTO): Promise<void> {
    try {
      const newProduct = this.productsRepository.create(payload);
      if (payload.brandId) {
        const brand = await this.brandsService.findOne(payload.brandId);
        newProduct.brand = brand;
      }
      if (payload.categoriesIds) {
        const categories = await this.categoriesRepository.find({
          where: {
            id: In(payload.categoriesIds),
          },
        });
        newProduct.categories = categories;
      }
      await this.productsRepository.save(newProduct);
    } catch (error) {
      if (error.code === '23505')
        throw new BadRequestException('La llave ya existe');
    }
  }

  async update(id: number, body: UpdateProductDTO): Promise<void> {
    const product = await this.findOne(id);

    if (product) {
      if (body.brandId) {
        const brand = await this.brandsService.findOne(body.brandId);
        product.brand = brand;
      }
      if (body.categoriesIds) {
        const categories = await this.categoriesRepository.find({
          where: {
            id: In(body.categoriesIds),
          },
        });
        product.categories = categories;
      }
      this.productsRepository.merge(product, body);
      await this.productsRepository.save(product);
    }
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    if (product) {
      await this.productsRepository.delete(id);
    }
  }
}
