import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class User {
    @IsString()
    id: string;

    @IsString()
    login: string;

    password: string;
    
    @IsNumber()
    version: number;

    @IsNumber()
    createdAt: number;

    @IsNumber()
    updatedAt: number;
}
