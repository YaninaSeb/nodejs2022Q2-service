import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id);
  }
}
