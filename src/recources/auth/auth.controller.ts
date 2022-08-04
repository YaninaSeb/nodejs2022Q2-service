import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { AuthSignupDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  signup(@Body() authSignupDto: AuthSignupDto) {
    return this.authService.signup(authSignupDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() authRefreshDto: AuthRefreshDto) {
    return this.authService.refresh(authRefreshDto);
  }
}
