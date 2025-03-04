import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SeedModule } from './seed/seed.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    CustomerModule,
    AuthModule,
    ProductModule,
    SeedModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
