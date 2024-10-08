import { DataSource } from 'typeorm';
import { Product, ProductImage } from '../entities';

export const productsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];

export const productsImageProviders = [
  {
    provide: 'PRODUCT_IMAGES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductImage),
    inject: ['DATA_SOURCE'],
  },
];
