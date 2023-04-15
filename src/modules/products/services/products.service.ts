import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Producto ${id} no fue encontrado`);

    return product;
  }

  async create(payload: CreateProductDTO): Promise<void> {
    const newUser = this.productsRepository.create(payload);
    await this.productsRepository.save(newUser);
  }

  async update(id: number, body: UpdateProductDTO): Promise<void> {
    const product = await this.findOne(id);

    if (product) {
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
