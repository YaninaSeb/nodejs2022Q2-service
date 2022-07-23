import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { validate, version } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async findOne(albumId: string): Promise<AlbumEntity> {
    if (!validate(albumId) || version(albumId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const album =  await this.albumRepository.findOne( { where: { id: albumId } } );

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = await this.albumRepository.create({...createAlbumDto});

    await this.albumRepository.save(album);

    return album;
  }

  async update(albumId: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    if (!validate(albumId) || version(albumId) !== 4) {
      throw new BadRequestException('This id is invalid');
    }

    const album =  await this.albumRepository.findOne( { where: { id: albumId } } );

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const id = album.id;

    return await this.albumRepository.save({id, ...updateAlbumDto});
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
