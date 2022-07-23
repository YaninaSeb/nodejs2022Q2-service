import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { validate, version } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
      @InjectRepository(ArtistEntity)
      private artistRepository: Repository<ArtistEntity>
) {}

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async findOne(artistId: string): Promise<ArtistEntity> {
    if (!validate(artistId) || version(artistId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const artist = await this.artistRepository.findOne( { where: { id: artistId } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {

    const artist = await this.artistRepository.create({...createArtistDto});

    await this.artistRepository.save(artist);

    return artist;
  }

  async update(artistId: string, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    if (!validate(artistId) || version(artistId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const artist = await this.artistRepository.findOne( { where: { id: artistId } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const id = artist.id;

    return await this.artistRepository.save({id, ...updateArtistDto});
  }

  async remove(artistId: string) {
    if (!validate(artistId) || version(artistId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const deleteResponse = await this.artistRepository.delete(artistId);

    if (!deleteResponse.affected) {
      throw new NotFoundException('Artist not found');
    }

    // const artistInTrackIndex = this.inMemoryDb.tracks.findIndex(
    //   (elem: Track) => elem.artistId === id,
    // );
    // if (artistInTrackIndex > -1) {
    //   this.inMemoryDb.tracks[artistInTrackIndex].artistId = null;
    // }

    // const artistInAlbumIndex = this.inMemoryDb.albums.findIndex(
    //   (elem: Album) => elem.artistId === id,
    // );
    // if (artistInAlbumIndex > -1) {
    //   this.inMemoryDb.albums[artistInAlbumIndex].artistId = null;
    // }

    // const artistInAFavsIndex = this.inMemoryDb.favorites.artists.findIndex(
    //   (artistId: string) => artistId === id,
    // );
    // if (artistInAFavsIndex > -1) {
    //   this.inMemoryDb.favorites.artists.splice(artistInAFavsIndex, 1);
    // }
  }
}
