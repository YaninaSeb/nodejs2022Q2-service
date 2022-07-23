import * as dotenv from 'dotenv';
import { DataSourceOptions} from 'typeorm';
import { AlbumEntity } from './recources/albums/entities/album.entity';
import { ArtistEntity } from './recources/artists/entities/artist.entity';
import { TrackEntity } from './recources/tracks/entities/track.entity';
import { UserEntity } from './recources/users/entities/user.entity'

dotenv.config();

export default {
    type: 'postgres',
    host: 'docker-db',
    port: +(process.env.POSTGRES_PORT as string) as number,
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    entities: [ UserEntity, ArtistEntity, AlbumEntity, TrackEntity ], 
    migrations: [ 'dist/**/migration/*.js' ],
    migrationsRun: true,
    synchronize: true,
} as DataSourceOptions;
