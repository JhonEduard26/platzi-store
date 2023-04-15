import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brands.dto';
import { Brand } from '../entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
  ) {}

  findAll(): Promise<Brand[]> {
    return this.brandsRepository.find();
  }

  async findOne(id: number): Promise<Brand | null> {
    const brand = this.brandsRepository.findOneBy({ id });

    if (!brand) throw new NotFoundException(`Marca ${id} no fue encontrado`);

    return brand;
  }

  async create(payload: CreateBrandDTO): Promise<void> {
    const newBrand = this.brandsRepository.create(payload);
    await this.brandsRepository.save(newBrand);
  }

  async update(id: number, body: UpdateBrandDTO): Promise<void> {
    const brand = await this.findOne(id);

    if (brand) {
      this.brandsRepository.merge(brand, body);
      await this.brandsRepository.save(brand);
    }
  }

  async remove(id: number): Promise<void> {
    const brand = this.findOne(id);

    if (brand) {
      await this.brandsRepository.delete(id);
    }
  }
}
