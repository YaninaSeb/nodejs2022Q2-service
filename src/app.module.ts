import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './recources/artists/artists.module';
import { TracksModule } from './recources/tracks/tracks.module';
import { UsersModule } from './recources/users/users.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
