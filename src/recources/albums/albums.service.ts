import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4, validate, version } from 'uuid';

@Injectable()
export class AlbumsService {
  private static albums: Album[] = [];

  findAll() {
    return AlbumsService.albums;
  }

  findOne(id: string) {
    const album = AlbumsService.albums.find((elem: Album) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid')
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();

    const newAlbum = {id, ...createAlbumDto}

    AlbumsService.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = AlbumsService.albums.find((elem: Album) => elem.id === id);

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
    const albumIndex = AlbumsService.albums.findIndex((elem: Album) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (albumIndex < 0) {
      throw new NotFoundException('Album not found');
    }

    AlbumsService.albums.splice(albumIndex, 1);

    return
  }
}
