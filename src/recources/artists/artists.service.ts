import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class ArtistsService {
  private static artists: Artist[] = [];

  findAll(): Artist[] {
    return ArtistsService.artists;
  }

  findOne(id: string) {
    const artist = ArtistsService.artists.find((elem: Artist) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid')
    }
    if (!artist) {
      throw new NotFoundException('User not found');
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();
    const { name, grammy } = createArtistDto;

    const newArtist = {
      id,
      name,
      grammy
    }

    ArtistsService.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = ArtistsService.artists.find((elem: Artist) => elem.id === id);
    const { name, grammy } = updateArtistDto;

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid');
    }
    if (!artist) {
      throw new NotFoundException('User not found');
    }

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  remove(id: string) {
    const artistIndex = ArtistsService.artists.findIndex((elem: Artist) => elem.id === id);

    if (!validate(id)) {
      throw new BadRequestException('This id is invalid');
    }
    if (artistIndex < 0) {
      throw new NotFoundException('User not found');
    }

    ArtistsService.artists.splice(artistIndex, 1)

    return [];
  }
}
