import { Controller, Post, Body, Request, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { SignupDto } from './dto/auth-signup.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

}
