import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { AuthSignupDto } from './dto/auth-signup.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) {}

  signup(authSignupDto: AuthSignupDto) {
  //   bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  //     // Store hash in your password DB.
  // });
    return this.userService.create(authSignupDto);
  }


  login(authLoginDto: AuthLoginDto) {
    return 'This action adds a new auth';
  }


  refresh(authRefreshDto: AuthRefreshDto) {
    return 'This action adds a new auth';
  }

  
}
