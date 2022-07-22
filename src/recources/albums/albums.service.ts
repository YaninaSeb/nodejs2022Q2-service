import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { v4 as uuidv4, validate, version } from 'uuid';
import { InMemoryDb } from 'src/db/in-memory-db';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Artist } from '../artists/entities/artist.entity';
// import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(albumId: string) {
    if (!validate(albumId) || version(albumId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const album =  await this.albumRepository.findOne( { where: { id: albumId } } );

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();

    const newAlbum = { id, ...createAlbumDto };

    await this.albumRepository.save(newAlbum);

    return newAlbum;
  }

  async update(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(albumId) || version(albumId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const album =  await this.albumRepository.findOne( { where: { id: albumId } } );

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    await this.albumRepository.save(album);

    return album;
  }

  async remove(albumId: string) {
    if (!validate(albumId) || version(albumId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const deleteResponse = await this.albumRepository.delete(albumId);

    if (!deleteResponse.affected) {
      throw new NotFoundException('Album not found');
    }


    // const albumsInTrackIndex = this.inMemoryDb.tracks.findIndex(
    //   (elem: Track) => elem.albumId === id,
    // );
    // if (albumsInTrackIndex > -1) {
    //   this.inMemoryDb.tracks[albumsInTrackIndex].albumId = null;
    // }

    // const albumInAFavsIndex = this.inMemoryDb.favorites.albums.findIndex(
    //   (albumId: string) => albumId === id,
    // );
    // if (albumInAFavsIndex > -1) {
    //   this.inMemoryDb.favorites.albums.splice(albumInAFavsIndex, 1);
    // }

    // return;
  }
}
