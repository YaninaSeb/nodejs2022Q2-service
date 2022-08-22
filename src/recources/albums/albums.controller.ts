import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.albumsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.albumsService.remove(id);
  }
}
