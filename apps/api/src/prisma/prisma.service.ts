import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect()
      .then(() => {
        console.log('DB: connected');
      })
      .catch(err => {
        console.log('DB: Error conexión', err);
      });
  }
}
