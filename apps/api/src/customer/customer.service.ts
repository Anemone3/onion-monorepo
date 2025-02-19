import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { userId, ...customerDto } = createCustomerDto;

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

  async update(updateCustomerDto: UpdateCustomerDto) {
    const { userId, ...updateCustomer } = updateCustomerDto;

    try {
      const customer = await this.prismaService.customer.update({
        where: { userId },
        data: {
          ...updateCustomer,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
