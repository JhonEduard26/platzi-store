import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Nicolas',
      email: 'nico@nico.com',
      password: '12345',
      username: 'nicobytes',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((item) => item.id === id);

    if (!user) throw new NotFoundException(`Usuario ${id} no fue encontrado`);

    return user;
  }

  create(payload: CreateUserDTO): void {
    this.counterId++;

    const newUser = {
      id: this.counterId,
      ...payload,
    };

    this.users.push(newUser);
  }

  update(id: number, body: UpdateUserDTO): void {
    const user = this.findOne(id);

    if (user) {
      const userIndex = this.users.findIndex((item) => item.id === id);
      this.users[userIndex] = {
        id,
        ...user,
        ...body,
      };
    }
  }

  delete(id: number): void {
    const user = this.findOne(id);

    if (user) {
      const userIndex = this.users.findIndex((item) => item.id === id);
      this.users.splice(userIndex, 1);
    }
  }
}
