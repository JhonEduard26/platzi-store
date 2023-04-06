import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../dtos/customers.dtos';
import { Customer } from '../entities/customer.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { ProductsService } from 'src/modules/products/services/products.service';

@Injectable()
export class CustomersService {
  constructor(private readonly productsService: ProductsService) {}

  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      address: 'cra 9',
      name: 'jhon',
      phone: '22222',
    },
  ];

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

  findOrderByCustomer(id: number): Order {
    const customer = this.findOne(id);
    return {
      id: 1,
      total: 0,
      date: new Date(),
      customer,
      products: this.productsService.findAll(),
    };
  }
}
