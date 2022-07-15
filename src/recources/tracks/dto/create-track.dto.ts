import { Optional } from "@nestjs/common";
import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateTrackDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID(4)
    @IsNotEmpty()
    artistId: string;

    @IsUUID(4)
    @IsNotEmpty()
    albumId: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;
}
