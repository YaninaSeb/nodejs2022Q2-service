import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDb } from 'src/db/in-memory-db';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDb],
})
export class AlbumsModule {}
