import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDb } from 'src/db/in-memory-db';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDb],
})
export class ArtistsModule {}
