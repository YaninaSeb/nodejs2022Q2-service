import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  artistId: string;

  @IsOptional()
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
