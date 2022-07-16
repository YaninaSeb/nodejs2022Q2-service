import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryDb } from 'src/db/in-memory-db';
import { Artist } from '../artists/entities/artist.entity';
import { v4 as uuidv4, validate, version } from 'uuid';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(private inMemoryDb: InMemoryDb) {}

  findAll() {
    const arrArtists = [];
    const arrAlbums = [];
    const arrTracks = [];

    this.inMemoryDb.favorites.artists.forEach((artistId: string) => {
      const artist = this.inMemoryDb.artists.find(
        (elem: Artist) => elem.id === artistId,
      );
      arrArtists.push(artist);
    });

    this.inMemoryDb.favorites.albums.forEach((albumId: string) => {
      const album = this.inMemoryDb.albums.find(
        (elem: Album) => elem.id === albumId,
      );
      arrAlbums.push(album);
    });

    this.inMemoryDb.favorites.tracks.forEach((trackId: string) => {
      const track = this.inMemoryDb.tracks.find(
        (elem: Track) => elem.id === trackId,
      );
      arrTracks.push(track);
    });

    const res = {
      artists: arrArtists,
      albums: arrAlbums,
      tracks: arrTracks,
    };

    return res;
  }

  //Track

  addTrack(id: string) {
    const track = this.inMemoryDb.tracks.find((elem: Track) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!track) {
      throw new UnprocessableEntityException(
        "Track with this id doesn't exist",
      );
    }

    this.inMemoryDb.favorites.tracks.push(id);
    return;
  }

  removeTrack(id: string) {
    const trackIndex = this.inMemoryDb.favorites.tracks.findIndex(
      (elem: string) => elem === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (trackIndex < 0) {
      throw new NotFoundException('This track is not favorite');
    }

    this.inMemoryDb.favorites.tracks.splice(trackIndex, 1);
    return;
  }

  //Album

  addAlbum(id: string) {
    const album = this.inMemoryDb.albums.find((elem: Album) => elem.id === id);

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!album) {
      throw new UnprocessableEntityException(
        "Album with this id doesn't exist",
      );
    }

    this.inMemoryDb.favorites.albums.push(id);
    return;
  }

  removeAlbum(id: string) {
    const albumIndex = this.inMemoryDb.favorites.albums.findIndex(
      (elem: string) => elem === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (albumIndex < 0) {
      throw new NotFoundException('This album is not favorite');
    }

    this.inMemoryDb.favorites.albums.splice(albumIndex, 1);
    return;
  }

  //Artist

  addArtist(id: string) {
    const artist = this.inMemoryDb.artists.find(
      (elem: Artist) => elem.id === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!artist) {
      throw new UnprocessableEntityException(
        "Artist with this id doesn't exist",
      );
    }

    this.inMemoryDb.favorites.artists.push(id);
    return;
  }

  removeArtist(id: string) {
    const artistIndex = this.inMemoryDb.favorites.artists.findIndex(
      (elem: string) => elem === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (artistIndex < 0) {
      throw new NotFoundException('This artist is not favorite');
    }

    this.inMemoryDb.favorites.artists.splice(artistIndex, 1);
    return;
  }
}
