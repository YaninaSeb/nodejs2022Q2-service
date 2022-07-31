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

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  updatedAt: number;

  toResponse() {
    const { id, login, password, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
