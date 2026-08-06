import { Injectable } from '@nestjs/common';

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
}