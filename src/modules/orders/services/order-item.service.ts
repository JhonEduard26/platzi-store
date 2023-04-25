import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { OrdersService } from './orders.service';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private readonly orderService: OrdersService,
    private readonly productService: ProductsService,
  ) {}

  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOneBy({ id });

    if (!orderItem)
      throw new NotFoundException(`Venta detalle ${id} no fue encontrada`);

    return orderItem;
  }

  async create(payload: CreateOrderItemDto): Promise<void> {
    const newOrderItem = this.orderItemRepository.create(payload);

    if (newOrderItem.orderId && newOrderItem.productId) {
      const order = await this.orderService.findOne(payload.orderId);
      const product = await this.productService.findOne(payload.productId);
      newOrderItem.order = order;
      newOrderItem.product = product;
    }

    await this.orderItemRepository.save(newOrderItem);
  }

  async update(id: number, body: UpdateOrderItemDto): Promise<void> {
    const order = await this.findOne(id);

    if (order) {
      this.orderItemRepository.merge(order, body);

      await this.orderItemRepository.save(order);
    }
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);

    if (order) {
      await this.orderItemRepository.delete(id);
    }
  }
}
