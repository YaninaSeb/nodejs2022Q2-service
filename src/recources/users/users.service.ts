import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((elem: User) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid')
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const { login, password } = createUserDto;
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    const newUser = {
      id,
      login,
      version,
      createdAt,
      updatedAt
    }

    this.users.push({password, ...newUser});

    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((elem: User) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    user.version += 1;
    user.updatedAt = Date.now()
    user.password = updateUserDto.newPassword;

    const updateUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return updateUser;
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((elem: User) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid');
    }
    if (userIndex < 0) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1)

    return [];
  }
}
