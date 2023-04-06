import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDTO, UpdateBrandDTO } from 'src/dtos/brands.dtos';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [];

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: number): Brand {
    const brand = this.brands.find((item) => item.id === id);

    if (!brand) throw new NotFoundException(`Marca ${id} no fue encontrado`);

    return brand;
  }

  create(payload: CreateBrandDTO): void {
    this.counterId++;

    const newBrand = {
      id: this.counterId,
      ...payload,
    };

    this.brands.push(newBrand);
  }

  update(id: number, body: UpdateBrandDTO): void {
    const brand = this.findOne(id);

    if (brand) {
      const brandIndex = this.brands.findIndex((item) => item.id === id);
      this.brands[brandIndex] = {
        id,
        ...brand,
        ...body,
      };
    }
  }

  delete(id: number): void {
    const brand = this.findOne(id);

    if (brand) {
      const brandIndex = this.brands.findIndex((item) => item.id === id);
      this.brands.splice(brandIndex, 1);
    }
  }
}
