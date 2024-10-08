import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {
  productsImageProviders,
  productsProviders,
} from './providers/products.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ProductsController],
  providers: [...productsProviders, ...productsImageProviders, ProductsService],
  imports: [DatabaseModule],
})
export class ProductsModule {}
