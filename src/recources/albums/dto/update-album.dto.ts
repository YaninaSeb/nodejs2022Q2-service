import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  artistId: string; // refers to Artist
}
