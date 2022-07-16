import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4, validate, version } from 'uuid';
import { InMemoryDb } from 'src/db/in-memory-db';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(private inMemoryDb: InMemoryDb) {}

  findAll() {
    return this.inMemoryDb.albums;
  }

  findOne(id: string) {
    const album = this.inMemoryDb.albums.find((elem: Album) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();

    const newAlbum = { id, ...createAlbumDto };

    this.inMemoryDb.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.inMemoryDb.albums.find((elem: Album) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  remove(id: string) {
    const albumIndex = this.inMemoryDb.albums.findIndex(
      (elem: Album) => elem.id === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (albumIndex < 0) {
      throw new NotFoundException('Album not found');
    }

    this.inMemoryDb.albums.splice(albumIndex, 1);

    const albumsInTrackIndex = this.inMemoryDb.tracks.findIndex(
      (elem: Track) => elem.albumId === id,
    );
    if (albumsInTrackIndex > -1) {
      this.inMemoryDb.tracks[albumsInTrackIndex].albumId = null;
    }

    const albumInAFavsIndex = this.inMemoryDb.favorites.albums.findIndex(
      (albumId: string) => albumId === id,
    );
    if (albumInAFavsIndex > -1) {
      this.inMemoryDb.favorites.albums.splice(albumInAFavsIndex, 1);
    }

    return;
  }
}
