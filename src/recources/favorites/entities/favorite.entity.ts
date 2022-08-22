import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  tracks: string[];
}
