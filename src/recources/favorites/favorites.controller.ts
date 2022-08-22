import {
  Controller,
  Get,
  Post,
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
  async findAll() {
    return await this.favoritesService.findAll();
  }

  //Track
  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string) {
    await this.favoritesService.removeTrack(id);
  }

  //Album
  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string) {
    await this.favoritesService.removeAlbum(id);
  }

  //Artist
  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string) {
    await this.favoritesService.removeArtist(id);
  }
}
