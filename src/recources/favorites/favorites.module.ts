import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryDb } from 'src/db/in-memory-db';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryDb],
})
export class FavoritesModule {}
