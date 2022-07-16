import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4, validate, version } from 'uuid';
import { InMemoryDb } from 'src/db/in-memory-db';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class ArtistsService {
  constructor(private inMemoryDb: InMemoryDb) {}

  findAll(): Artist[] {
    return this.inMemoryDb.artists;
  }

  findOne(id: string) {
    const artist = this.inMemoryDb.artists.find(
      (elem: Artist) => elem.id === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();

    const newArtist = { id, ...createArtistDto };

    this.inMemoryDb.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.inMemoryDb.artists.find(
      (elem: Artist) => elem.id === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  remove(id: string) {
    const artistIndex = this.inMemoryDb.artists.findIndex(
      (elem: Artist) => elem.id === id,
    );

    if (!validate(id) || version(id) !== 4) {
      throw new BadRequestException('This id is invalid');
    }
    if (artistIndex < 0) {
      throw new NotFoundException('Artist not found');
    }

    this.inMemoryDb.artists.splice(artistIndex, 1);

    const artistInTrackIndex = this.inMemoryDb.tracks.findIndex((elem: Track) => elem.artistId === id);
    if (artistInTrackIndex > -1) {
      this.inMemoryDb.tracks[artistInTrackIndex].artistId = null;
    }

    const artistInAlbumIndex = this.inMemoryDb.albums.findIndex((elem: Album) => elem.artistId === id);
    if (artistInAlbumIndex > -1) {
      this.inMemoryDb.albums[artistInAlbumIndex].artistId = null;
    }

    const artistInAFavsIndex = this.inMemoryDb.favorites.artists.findIndex((artistId: string) => artistId === id);
    if (artistInAFavsIndex > -1) {
      this.inMemoryDb.favorites.artists.splice(artistInAFavsIndex, 1);
    }
  
  }
}
