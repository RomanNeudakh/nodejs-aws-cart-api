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
      host: 'database-1.c7qgu0se05ac.eu-west-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'hjvfyytdlf[',
      database: 'postgres',
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
