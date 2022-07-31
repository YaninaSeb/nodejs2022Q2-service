import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistEntity } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService]
})
export class ArtistsModule {}
