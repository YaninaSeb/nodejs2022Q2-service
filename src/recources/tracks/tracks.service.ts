import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4, validate, version } from 'uuid';
import { InMemoryDb } from 'src/db/in-memory-db';

@Injectable()
export class TracksService {
  constructor(private inMemoryDb: InMemoryDb) {}

  findAll(): Track[] {
    return this.inMemoryDb.tracks;
  }

  findOne(id: string): Track {
    const track = this.inMemoryDb.tracks.find((elem: Track) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const id = uuidv4();

    const newTrack = { id, ...createTrackDto };

    this.inMemoryDb.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.inMemoryDb.tracks.find((elem: Track) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    return track;
  }

  remove(id: string) {
    const trackIndex = this.inMemoryDb.tracks.findIndex(
      (elem: Track) => elem.id === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (trackIndex < 0) {
      throw new NotFoundException('Track not found');
    }

    this.inMemoryDb.tracks.splice(trackIndex, 1);

    const trackInAFavsIndex = this.inMemoryDb.favorites.tracks.findIndex(
      (trackId: string) => trackId === id,
    );
    if (trackInAFavsIndex > -1) {
      this.inMemoryDb.favorites.tracks.splice(trackInAFavsIndex, 1);
    }

    return;
  }
}
