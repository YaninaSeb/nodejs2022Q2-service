import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate, version } from 'uuid';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(userId: string): Promise<UserEntity> {
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
    const user = this.userRepository.create({...createUserDto});
    
    return (await this.userRepository.save(user)).toResponse();
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

    user.password = updateUserDto.newPassword;

    return (await this.userRepository.save(user)).toResponse();
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
