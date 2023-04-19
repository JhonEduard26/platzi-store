import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDTO, UpdateCustomerDTO } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';
import { ProductsService } from 'src/modules/products/services/products.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    private readonly productsService: ProductsService,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  async findOne(id: number): Promise<Customer | null> {
    const customer = await this.customersRepository.findOneBy({ id });

    if (!customer)
      throw new NotFoundException(`Cliente ${id} no fue encontrada`);

    return customer;
  }

  async create(payload: CreateCustomerDTO): Promise<void> {
    const newUser = this.customersRepository.create(payload);
    await this.customersRepository.save(newUser);
  }

  async update(id: number, body: UpdateCustomerDTO): Promise<void> {
    const customer = await this.findOne(id);

    if (customer) {
      this.customersRepository.merge(customer, body);
      await this.customersRepository.save(customer);
    }
  }

  async delete(id: number): Promise<void> {
    const customer = await this.findOne(id);

    if (customer) {
      await this.customersRepository.delete(id);
    }
  }
}
