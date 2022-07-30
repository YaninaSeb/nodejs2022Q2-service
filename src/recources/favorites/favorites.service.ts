import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate, version } from 'uuid';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService,
    private readonly trackService: TracksService,
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>
  ) {}

  async createFavorites() {
    const createFavorites = this.favoritesRepository.create({
      artists: [],
      albums: [],
      tracks: []
    });

    await this.favoritesRepository.save(createFavorites);
  }

  async getFavorites() {
    let favorites = await this.favoritesRepository.find();

    if (favorites.length === 0 ) {
      await this.createFavorites()
      favorites = await this.favoritesRepository.find();
    }
    return favorites[0];
  }

  async findAll() {
    const { artists, albums, tracks} = await this.getFavorites();

    const arrArtists = [];
    const arrAlbums = [];
    const arrTracks = [];

    artists.forEach( async (id: string) => {
      const elem = await this.artistService.findOne(id);
      arrArtists.push(elem);
    });

    albums.forEach( async (id: string) => {
      const elem = await this.albumService.findOne(id);
      arrAlbums.push(elem);
    });

    tracks.forEach( async (id: string) => {
      const elem = await this.trackService.findOne(id);
      arrTracks.push(elem);
    });

    return {
      artists: arrArtists,
      albums: arrAlbums,
      tracks: arrTracks
    }
  }

  //Track

  async addTrack(id: string) {
    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This ID is invalid');
    }

    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException(
        "Track with this ID doesn't exist",
      );
    }

    const favorites = await this.getFavorites();

    favorites.tracks.push(id);

    await this.favoritesRepository.save(favorites);
  }

  async removeTrack(id: string) {
    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This ID is invalid');
    }

    const favorites = await this.getFavorites();

    const trackIndex = favorites.tracks.findIndex(
      (elem: string) => elem === id,
    );

    if (trackIndex < 0) {
      throw new NotFoundException('This track is not favorite');
    }

    favorites.tracks.splice(trackIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  //Album

  async addAlbum(id: string) {
    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This ID is invalid');
    }

    const album = await this.albumService.findOne(id);
    
    if (!album) {
      throw new UnprocessableEntityException(
        "Album with this ID doesn't exist",
      );
    }

    const favorites = await this.getFavorites();

    favorites.albums.push(id);

    await this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string) {
    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This ID is invalid');
    }

    const favorites = await this.getFavorites();

    const albumIndex = await favorites.albums.findIndex(
      (elem: string) => elem === id,
    );

    if (albumIndex < 0) {
      throw new NotFoundException('This album is not favorite');
    }

    favorites.albums.splice(albumIndex, 1);
    
    await this.favoritesRepository.save(favorites);
  }

  //Artist

  async addArtist(id: string) {
    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This ID is invalid');
    }

    const artist = await this.artistService.findOne(id);
    
    if (!artist) {
      throw new UnprocessableEntityException(
        "Artist with this ID doesn't exist",
      );
    }

    const favorites = await this.getFavorites();
    
    favorites.artists.push(id);

    await this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string) {
    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This ID is invalid');
    }

    const favorites = await this.getFavorites();

    const artistIndex = await favorites.artists.findIndex(
      (elem: string) => elem === id,
    );

    if (artistIndex < 0) {
      throw new NotFoundException('This artist is not favorite');
    }

    favorites.artists.splice(artistIndex, 1);
    
    await this.favoritesRepository.save(favorites);
  }
}
