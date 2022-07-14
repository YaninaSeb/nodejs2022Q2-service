import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class User {
    id: string;
    login: string;

    @Exclude()
    password: string;
    
    version: number;
    createdAt: number;
    updatedAt: number;
}
