import { Controller, Get, Post, Body, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { RegisterDto } from './dto/auth-register.dto';
import { GetRefreshToken } from './decorators/refresh-token.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { UserRequest } from './interfaces/req-user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const auth = await this.authService.login(loginDto);

    const { user, accessToken, refreshToken } = auth;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.ACCEPTED).json({ user, accessToken });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const auth = await this.authService.register(registerDto);
    const { user, accessToken, refreshToken } = auth;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.ACCEPTED).json({ user, accessToken });
  }

  @Post('refresh-token')
  async refreshToken(@GetRefreshToken() token: string, @Res() res: Response) {
    const accessToken = await this.authService.validateToken(token);

    res.status(HttpStatus.ACCEPTED).json({ accessToken, message: 'Token actualizado' });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: UserRequest) {
    const auth = await this.authService.getProfile({ id: user.sub });

    return auth;
  }
}
