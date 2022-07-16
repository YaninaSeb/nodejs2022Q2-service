import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class TracksService {
  private static tracks: Track[] = [];

  findAll(): Track[] {
    return TracksService.tracks;
  }

  findOne(id: string): Track {
    const track = TracksService.tracks.find((elem: Track) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid')
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const id = uuidv4();

    const { name, artistId, albumId, duration } = createTrackDto;

    const newTrack = { id, name, artistId, albumId, duration }

    TracksService.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = TracksService.tracks.find((elem: Track) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updateTrack = {
      id,
      ...updateTrackDto
    }

    return updateTrack;
  }

  remove(id: string) {
    const trackIndex = TracksService.tracks.findIndex((elem: Track) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid');
    }
    if (trackIndex < 0) {
      throw new NotFoundException('User not found');
    }

    TracksService.tracks.splice(trackIndex, 1)
  }
}
