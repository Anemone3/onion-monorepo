import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const { slug, categories, ...productDto } = createProductDto;

    try {
      const product = await this.prismaService.product.create({
        data: {
          ...productDto,
          slug: slugify(productDto.name, { lower: true, replacement: '_' }),
          categories: {
            connectOrCreate: categories.map(categoryName => ({
              where: {
                name: categoryName,
              },
              create: {
                name: categoryName,
              },
            })),
          },
        },
        include: {
          categories: true,
        },
      });


      return product
    } catch (error) {}
  }

  async findAll() {
    return await this.prismaService.product.findMany({
      include:{
        categories: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
