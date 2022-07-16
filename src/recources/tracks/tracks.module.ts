import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { ArtistsModule } from '../artists/artists.module';
import { InMemoryDb } from 'src/db/in-memory-db';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDb],
})
export class TracksModule {}
