import { Body, Controller, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserRequest } from 'src/auth/interfaces/req-user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post(':id')
  async userToCustomer(@Body() customerDto: CreateCustomerDto, @Param('id', ParseUUIDPipe) id: string) {
    const customer = await this.customerService.create(id, customerDto);

    return customer;
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateCustomer(@Body() updateCustomerDto: UpdateCustomerDto, @GetUser() user: UserRequest) {
    const customer = await this.customerService.update(user.sub, updateCustomerDto);

    return customer;
  }
}
