import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

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
    return this.products.find((item) => item.id === id);
  }

  create(payload: any): void {
    this.counterId++;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);
  }

  update(id: number, body: any): void {
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
