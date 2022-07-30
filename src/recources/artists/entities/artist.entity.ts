import { Exclude } from "class-transformer";
import { AlbumEntity } from "src/recources/albums/entities/album.entity";
import { TrackEntity } from "src/recources/tracks/entities/track.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  @Exclude()
  albums: AlbumEntity[]

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  @Exclude()
  tracks: TrackEntity[]
}