import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDTO, UpdateCustomerDTO } from 'src/dtos/customers.dtos';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [];

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: number): Customer {
    const customer = this.customers.find((item) => item.id === id);

    if (!customer)
      throw new NotFoundException(`Cliente ${id} no fue encontrada`);

    return customer;
  }

  create(payload: CreateCustomerDTO): void {
    this.counterId++;

    const newCustomer = {
      id: this.counterId,
      ...payload,
    };

    this.customers.push(newCustomer);
  }

  update(id: number, body: UpdateCustomerDTO): void {
    const customer = this.findOne(id);

    if (customer) {
      const customerIndex = this.customers.findIndex((item) => item.id === id);
      this.customers[customerIndex] = {
        id,
        ...customer,
        ...body,
      };
    }
  }

  delete(id: number): void {
    const customer = this.findOne(id);

    if (customer) {
      const customerIndex = this.customers.findIndex((item) => item.id === id);
      this.customers.splice(customerIndex, 1);
    }
  }
}
