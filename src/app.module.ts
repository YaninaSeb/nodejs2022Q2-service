import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './recources/albums/albums.module';
import { ArtistsModule } from './recources/artists/artists.module';
import { FavoritesModule } from './recources/favorites/favorites.module';
import { TracksModule } from './recources/tracks/tracks.module';
import { UsersModule } from './recources/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './ormconfig';
import { AuthModule } from './recources/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
