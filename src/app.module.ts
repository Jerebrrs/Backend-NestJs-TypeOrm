import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DetabaseModule } from './detabase/detabase.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), DetabaseModule, ProductsModule, ],
})
export class AppModule {}
