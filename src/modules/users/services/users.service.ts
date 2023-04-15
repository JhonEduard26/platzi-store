import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    const user = this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`Usuario ${id} no fue encontrado`);

    return user;
  }

  async create(payload: CreateUserDTO): Promise<void> {
    const newUser = this.usersRepository.create(payload);
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
