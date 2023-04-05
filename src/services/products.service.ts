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
      image: 'url de la imagen',
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
    const productIndex = this.products.findIndex((item) => item.id === id);

    if (productIndex) {
      this.products[productIndex] = {
        id,
        ...body,
      };
    }

    return null;
  }

  delete(id: number): void {
    const productIndex = this.products.findIndex((item) => item.id === id);

    if (productIndex) {
      this.products.splice(productIndex, 1);

      return null;
    }
  }
}
