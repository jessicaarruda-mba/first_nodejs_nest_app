import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(name: string, email: string): User {
    const user: User = {
      id: this.nextId,
      name,
      email,
    };

    this.users.push(user);
    this.nextId++;

    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    
    this.users.splice(userIndex, 1);
    
    return { message: 'Usuário removido com sucesso' };
  }
}