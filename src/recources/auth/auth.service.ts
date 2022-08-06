import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth-login.dto';
import { SignupDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    if (user) {
      const isPassword = await bcrypt.compare(pass, user.password);
      if (!isPassword) {
        throw new ForbiddenException();
      }
      delete user.password;
      return user;
    }
    return null;
  }


  async signup(signupDto: SignupDto) {
    const password = await bcrypt.hash(
      signupDto.password,
      process.env.CRYPT_SALT
    );

    return await this.usersService.create({ ...signupDto, password });
  }


  async login(user: any) {
    const payload = { login: user.login, userId: user.id };
    
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    }; 
  }


  async refresh(refreshToken) {
    return 'This action adds a new auth';
  }

  
}
