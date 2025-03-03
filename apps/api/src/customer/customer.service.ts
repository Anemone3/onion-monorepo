import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createCustomerDto: CreateCustomerDto) {
    const { ...customerDto } = createCustomerDto;

    try {
      const customer = await this.prismaService.customer.create({
        data: {
          ...customerDto,
          userId,
        },
      });

      return customer;
    } catch (error) {
      console.log(error);
    }
  }

  async update(userId: string, updateCustomerDto: UpdateCustomerDto) {
    const { ...updateCustomer } = updateCustomerDto;

    try {
      const customer = await this.prismaService.customer.upsert({
        where: { userId },
        update: {
          ...updateCustomer,
        },
        create: {
          ...(updateCustomer as CreateCustomerDto),
          userId: userId,
        },
      });

      return customer;
    } catch (error) {
      console.log(error);

      if (error.code === 'P2025' || error.code === 'P2011') {
        throw new InternalServerErrorException(
          'No se encontró datos para la actualizacion del customer o el usuario no fue vinculado correctamente',
        );
      }
    }
  }
}
