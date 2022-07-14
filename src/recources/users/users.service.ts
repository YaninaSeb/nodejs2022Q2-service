import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((elem: User) => elem.id === id);
    if (!user) {
      throw new NotFoundException('Post not found.');
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const id = uuidv4();
    const version = 1;
    const createdAt = +Date.now();
    const updatedAt = +Date.now();

    const newUser = {
      id,
      ...createUserDto,
      version,
      createdAt,
      updatedAt
    }

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.users.find((elem: User) => elem.id === id);

    if (!user) {
      throw new NotFoundException('Post not found.');
    }

    user.id = uuidv4(); 
    user.version += 1;
    user.updatedAt = +Date.now()
    user.password = updateUserDto.newPassword;
    

    return user;
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((elem: User) => elem.id === id);

    this.users.splice(userIndex, 1)

    return [];
  }
}
