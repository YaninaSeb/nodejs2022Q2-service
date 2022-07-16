import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favoritesService.findAll();
  }

  //Track
  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  //Album
  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  //Artist
  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
