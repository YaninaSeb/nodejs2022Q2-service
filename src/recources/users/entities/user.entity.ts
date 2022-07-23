import { Exclude, Transform } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

}
