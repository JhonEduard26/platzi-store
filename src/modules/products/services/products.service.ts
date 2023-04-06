import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Mouse',
      description: 'lorem ipsum dolor',
      image: '',
      price: 50_000,
      stock: 50,
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);

    if (!product)
      throw new NotFoundException(`Producto ${id} no fue encontrado`);

    return product;
  }

  create(payload: CreateProductDTO): void {
    this.counterId++;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);
  }

  update(id: number, body: UpdateProductDTO): void {
    const product = this.findOne(id);

    if (product) {
      const productIndex = this.products.findIndex((item) => item.id === id);
      this.products[productIndex] = {
        id,
        ...product,
        ...body,
      };
    }
  }

  delete(id: number): void {
    const product = this.findOne(id);

    if (product) {
      const productIndex = this.products.findIndex((item) => item.id === id);
      this.products.splice(productIndex, 1);
    }
  }
}
