import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { role = 'USER', ...userData } = createUserDto;
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...userData,
          role: role
        },
      });

      return user;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    if (users.length === 0) return 'Not users avaliable';

    return users;
  }

  async findOne(id: string) {

    const isEmail = id.includes('@');

    return await this.prismaService.user.findUnique({
      where: isEmail ? { email: id } : { id: id}
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updated = await this.prismaService.user.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
      });

      return updated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    const deleted = await this.prismaService.user.delete({ where: { id } });
    return deleted;
  }
}
