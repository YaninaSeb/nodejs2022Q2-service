import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/recources/albums/entities/album.entity';
import { ArtistEntity } from 'src/recources/artists/entities/artist.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column( { nullable: true } )
  artistId: string;

  @Column( { nullable: true } )
  albumId: string;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  album: AlbumEntity; 
}
