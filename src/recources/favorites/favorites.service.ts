import {
  BadRequestException,
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

    for (const id of artists) {
      const hasArtist = await this.artistService.checkArtist(id);
      if (hasArtist) {
        const elem = await this.artistService.findOne(id);
        arrArtists.push(elem);
      } else {
        this.removeArtist(id);
      }
    };

    for (const id of albums) {
      const hasAlbum = await this.albumService.checkAlbum(id);
      if (hasAlbum) {
        const elem = await this.albumService.findOne(id);
        arrAlbums.push(elem);
      } else {
        this.removeAlbum(id);
      }
    };

    for (const id of tracks) {
      const hasTrack = await this.trackService.checkTrack(id);
      if (hasTrack) {
        const elem = await this.trackService.findOne(id);
        arrTracks.push(elem);
      } else {
        this.removeTrack(id);
      }
    };

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

    const hasTrack = await this.trackService.checkTrack(id);

    if (!hasTrack) {
      throw new UnprocessableEntityException(
        "Track with this ID doesn't exist",
      );
    }

    const favorites = await this.getFavorites();

    favorites.tracks.push(id);

    return await this.favoritesRepository.save(favorites);
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

    const hasAlbum = await this.albumService.checkAlbum(id);
    
    if (!hasAlbum) {
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

    const albumIndex = favorites.albums.findIndex(
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

    const hasArtist = await this.artistService.checkArtist(id);
    
    if (!hasArtist) {
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

    const artistIndex = favorites.artists.findIndex(
      (elem: string) => elem === id,
    );

    if (artistIndex < 0) {
      throw new NotFoundException('This artist is not favorite');
    }

    favorites.artists.splice(artistIndex, 1);
    
    await this.favoritesRepository.save(favorites);
  }
}
