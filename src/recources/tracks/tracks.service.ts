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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>
  ) {}

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async findOne(trackId: string): Promise<TrackEntity> {
    if (!validate(trackId) || version(trackId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const track = await this.trackRepository.findOne( { where: { id: trackId } } );

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const track = await this.trackRepository.create({...createTrackDto});

    await this.trackRepository.save(track);

    return track;
  }

  async update(trackId: string, updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
    if (!validate(trackId) || version(trackId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const track = await this.trackRepository.findOne( { where: { id: trackId } } );

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const id = track.id;

    return await this.trackRepository.save({id, ...updateTrackDto});
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
