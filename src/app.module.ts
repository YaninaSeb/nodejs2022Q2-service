import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryDb } from './db/in-memory-db';
import { AlbumsModule } from './recources/albums/albums.module';
import { ArtistsModule } from './recources/artists/artists.module';
import { TracksModule } from './recources/tracks/tracks.module';
import { UsersModule } from './recources/users/users.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
