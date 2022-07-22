import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { v4 as uuidv4, validate, version } from 'uuid';
import { InMemoryDb } from 'src/db/in-memory-db';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>
  ) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(trackId: string) {
    if (!validate(trackId) || version(trackId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const track = await this.trackRepository.findOne( { where: { id: trackId } } );

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();

    const newTrack = { id, ...createTrackDto };

    await this.trackRepository.save(newTrack);

    return newTrack;
  }

  async update(trackId: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(trackId) || version(trackId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const track = await this.trackRepository.findOne( { where: { id: trackId } } );

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    await this.trackRepository.save(track);

    return track;
  }

  async remove(trackId: string) {
    if (!validate(trackId) || version(trackId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const deleteResponse = await this.trackRepository.delete(trackId);

    if (!deleteResponse.affected) {
      throw new NotFoundException('Track not found');
    }

    // const trackInAFavsIndex = this.inMemoryDb.favorites.tracks.findIndex(
    //   (trackId: string) => trackId === id,
    // );
    // if (trackInAFavsIndex > -1) {
    //   this.inMemoryDb.favorites.tracks.splice(trackInAFavsIndex, 1);
    // }

    // return;
  }
}
