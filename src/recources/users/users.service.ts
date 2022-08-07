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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async hashPassword(password: string) {
    console.log('process.env.CRYPT_SALT', process.env.CRYPT_SALT)
    return bcrypt.hash(password, process.env.CRYPT_SALT)
  }

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

  async findOneByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login });

    if(!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = {...createUserDto};
    user.password = await this.hashPassword(user.password);

    const newUser = this.userRepository.create(user);
    
    return (await this.userRepository.save(newUser)).toResponse();
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    if (!validate(userId) || version(userId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const user = await this.userRepository.findOne( { where: { id: userId }});

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(
      updateUserDto.oldPassword, 
      user.password
    )
    if (!isMatch) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    user.password = await this.hashPassword(updateUserDto.newPassword);

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
