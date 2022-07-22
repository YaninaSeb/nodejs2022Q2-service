import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4, validate, version } from 'uuid';
import { UserEntity } from './entities/user.entity';
import { InMemoryDb } from 'src/db/in-memory-db';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(userId: string) {
    if (!validate(userId) || version(userId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const user = await this.userRepository.findOne( { where: { id: userId } } );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
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
      updatedAt,
    };

    const user = await this.userRepository.create({...newUser, password});

    await this.userRepository.save({...newUser, password});

    return {...newUser};
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    if (!validate(userId) || version(userId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const user = await this.userRepository.findOne( { where: { id: userId }});

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    user.version += 1;
    user.updatedAt = Date.now();
    user.password = updateUserDto.newPassword;

    const updateUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    await this.userRepository.save(updateUser);

    return updateUser;
  }

  async remove(userId: string) {
    if (!validate(userId) || version(userId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const deleteResponse = await this.userRepository.delete(userId);

    if (!deleteResponse.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
