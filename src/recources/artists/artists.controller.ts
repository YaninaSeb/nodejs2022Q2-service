import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.artistsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.artistsService.remove(id);
  }
}
