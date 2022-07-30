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
    const album = this.albumRepository.create({...createAlbumDto});

    return await this.albumRepository.save(album);
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
  }
}
