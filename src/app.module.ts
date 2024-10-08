import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ProductsModule,
    CommonModule,
  ],
})
export class AppModule {}
