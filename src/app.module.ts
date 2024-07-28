import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CartEntity, CartItemEntity],
      synchronize: false, 
      ssl: {
        rejectUnauthorized: false
      }
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
