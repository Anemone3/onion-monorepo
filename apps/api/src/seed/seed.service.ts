import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Onions } from './data/onion';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductService) {}

  async execute() {
    try {
        const seedProducts = Onions;
        const insertPromise: Promise<any>[] = [];

        seedProducts.forEach(onion => {
          insertPromise.push(this.productService.create(onion));
        });

        await Promise.all(insertPromise);
        return true;
    } catch (error) {
        return false    
    }
  }
}
