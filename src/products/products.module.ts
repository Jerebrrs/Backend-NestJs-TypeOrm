import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { DetabaseModule } from 'src/detabase/detabase.module';

@Module({
  controllers: [ProductsController],
  providers: [...productsProviders, ProductsService],
  imports: [DetabaseModule],
})
export class ProductsModule {}
