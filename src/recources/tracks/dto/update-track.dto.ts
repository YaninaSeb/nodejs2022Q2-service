import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
    @IsString()
    @IsNotEmpty()
    name: string;

    artistId: string | null;

    albumId: string | null;

    @IsNumber()
    @IsNotEmpty()
    duration: number;
}
