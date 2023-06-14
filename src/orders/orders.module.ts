import { Logger, Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { CraftsModule } from 'src/crafts/crafts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    CraftsModule,
  ],
  controllers: [OrdersController],
  providers: [OrderService, Logger],
  exports: [OrderService],
})
export class OrdersModule {}
