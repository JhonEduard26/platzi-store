import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/orders.dto';
import { CustomersService } from '../../users/services/customers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private OrdersRepository: Repository<Order>,
    private readonly customersService: CustomersService,
  ) {}

  findAll(): Promise<Order[]> {
    return this.OrdersRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.OrdersRepository.findOne({
      where: { id },
      relations: {
        items: true,
      },
    });

    if (!order) throw new NotFoundException(`Venta ${id} no fue encontrada`);

    return order;
  }

  async create(payload: CreateOrderDTO): Promise<void> {
    const newOrder = this.OrdersRepository.create(payload);

    if (newOrder.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newOrder.customer = customer;
    }

    await this.OrdersRepository.save(newOrder);
  }

  async update(id: number, body: UpdateOrderDTO): Promise<void> {
    const order = await this.findOne(id);

    if (order) {
      if (body.customerId) {
        const customer = await this.customersService.findOne(body.customerId);
        order.customer = customer;
      }
      this.OrdersRepository.merge(order, body);

      await this.OrdersRepository.save(order);
    }
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);

    if (order) {
      await this.OrdersRepository.delete(id);
    }
  }
}
