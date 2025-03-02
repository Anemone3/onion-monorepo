import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async seed() {
    return (await this.seedService.execute()) ? 'Datos insertados correctamente' : 'Error al ingresar datos';
  }
}
