import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArtistEntity } from "src/recources/artists/entities/artist.entity";
import { Exclude } from "class-transformer";
import { TrackEntity } from "src/recources/tracks/entities/track.entity";

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column( { nullable: true } )
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  @Exclude()
  tracks: TrackEntity[];
}
