import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post(':id')
  async userToCustomer(@Body() customerDto: CreateCustomerDto, @Param('id', ParseUUIDPipe) id: string) {
    const customer = await this.customerService.create(id,customerDto);

    return customer;
  }
}
