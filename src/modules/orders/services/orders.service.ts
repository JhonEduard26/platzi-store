import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from 'src/modules/orders/dtos/orders.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private OrdersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.OrdersRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.OrdersRepository.findOneBy({ id });

    if (!order) throw new NotFoundException(`Venta ${id} no fue encontrada`);

    return order;
  }

  async create(payload: CreateOrderDTO): Promise<void> {
    const newOrder = this.OrdersRepository.create(payload);

    await this.OrdersRepository.save(newOrder);
  }

  async update(id: number, body: UpdateOrderDTO): Promise<void> {
    const order = await this.findOne(id);

    if (order) {
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
