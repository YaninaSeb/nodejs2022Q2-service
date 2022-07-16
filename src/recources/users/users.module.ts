import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDb } from 'src/db/in-memory-db';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryDb],
})
export class UsersModule {}
