import { Injectable } from '@nestjs/common';
import { Album } from 'src/recources/albums/entities/album.entity';
import { Artist } from 'src/recources/artists/entities/artist.entity';
import { Favorite } from 'src/recources/favorites/entities/favorite.entity';
import { Track } from 'src/recources/tracks/entities/track.entity';
import { User } from 'src/recources/users/entities/user.entity';

@Injectable()
export class InMemoryDb {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  users: User[] = [];
  favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private static instance;

  constructor() {
    if (!InMemoryDb.instance) {
      InMemoryDb.instance = this;
    }

    return InMemoryDb.instance;
  }
}
