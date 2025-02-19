import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';
import { RegisterDto } from './dto/auth-register.dto';
import { Role } from 'src/user/interfaces/role.enum';
import { ConfigService } from '@nestjs/config';
import { AuthUserDto } from './dto/auth-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    try {
      const user = await this.userService.findOne(email);

      if (!user) throw new NotFoundException('user not exists');

      const isPasswordValid = compareSync(password, user.password);

      if (!isPasswordValid) throw new ForbiddenException('invalid credentials');

      const payload: JwtPayload = { sub: user.id, role: user.role };

      const accessToken = this.jwtService.sign(payload);

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      const { password: passwordHashed, role, ...data } = user;

      return {
        user: data,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Login error');
    }
  }

  async register(registerDto: RegisterDto) {
    const { password, ...registerUser } = registerDto;

    try {
      const salt = genSaltSync(10);
      const passwordHashed = hashSync(password, salt);

      const user = await this.userService.create({
        ...registerUser,
        password: passwordHashed,
        role: Role.USER,
      });

      const payload: JwtPayload = { sub: user.id, role: user.role };

      const accessToken = this.jwtService.sign(payload);

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      const { password: passwordHash, role, ...data } = user;

      return {
        user: data,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Login error');
    }
  }

  async validateToken(token: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      if (!payload) throw new BadRequestException('invalid_grant');

      // el antiguo payload tiene mas datos, prefiero separarlo.
      const newPayload: JwtPayload = {
        sub: payload.sub,
        role: payload.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload);

      if (!newAccessToken) throw new InternalServerErrorException('Error to generate new access token');

      return newAccessToken;
    } catch (error) {
      console.log(error);

      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException({
          error: 'invalid_grant',
          error_description: 'The refresh token is invalid or expired.',
        });
      } else if (error.name === 'JsonWebTokenError') {
        throw new ForbiddenException({
          error: 'forbidden',
          error_description: 'El token es inválido o ha sido modificado.',
        });
      } else {
        throw new InternalServerErrorException({
          error: 'server_error',
          error_description: 'Error interno al refrescar el token.',
        });
      }
    }
  }

  async getProfile(authUser: AuthUserDto) {
    const { id } = authUser;

    try {
      const user = await this.userService.findOne(id);

      if (!user) throw new ForbiddenException('User not exists');

      const { password, role, ...dataUser } = user;

      return {
        user: dataUser,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
