import { IsNotEmpty, IsString } from "class-validator";

export class AuthSignupDto {
    @IsString()
    @IsNotEmpty()
    login: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}
