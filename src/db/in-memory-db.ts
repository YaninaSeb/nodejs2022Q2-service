import { Injectable } from "@nestjs/common";
import { Album } from "src/recources/albums/entities/album.entity";
import { Artist } from "src/recources/artists/entities/artist.entity";
import { Track } from "src/recources/tracks/entities/track.entity";
import { User } from "src/recources/users/entities/user.entity";

@Injectable()
export class InMemoryDb {
    artists: Artist[] = [];
    albums: Album[] = [];
    tracks: Track[] = [];
    users: User[] = [];

    private static instance

    constructor() {
        if(!InMemoryDb.instance) {
            InMemoryDb.instance = this
        }

        return InMemoryDb.instance
    }

}