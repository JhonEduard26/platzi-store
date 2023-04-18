import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly customerService: CustomersService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        customer: true,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`Usuario ${id} no fue encontrado`);

    return user;
  }

  async create(payload: CreateUserDTO): Promise<void> {
    const newUser = this.usersRepository.create(payload);

    if (payload.customerId) {
      const customer = await this.customerService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    await this.usersRepository.save(newUser);
  }

  async update(id: number, body: UpdateUserDTO): Promise<void> {
    const user = await this.findOne(id);

    if (user) {
      this.usersRepository.merge(user, body);
      await this.usersRepository.save(user);
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (user) {
      await this.usersRepository.delete(id);
    }
  }
}
