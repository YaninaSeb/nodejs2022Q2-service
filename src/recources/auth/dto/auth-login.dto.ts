import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    login: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}
