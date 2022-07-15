import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class Track {
    id: string;

    name: string;

    artistId: string | null;

    albumId: string | null;

    duration: number;
}
