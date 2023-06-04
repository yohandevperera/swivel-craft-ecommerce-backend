import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/create-update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { Model } from 'mongoose';
import _ = require('lodash');
import { CraftsService } from 'src/crafts/crafts.service';

/**
 * Usage and Description - This file will directly call the
 * model and the defined craft collection to perfom the CRUD operations
 *
 **/

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private craftService: CraftsService,
  ) {}

  /**
   * Usage - This method will be used to create a craft object in the
   * craft collection
   *
   * @parms createOrder @typedef OrderDto
   * @returns @typedef Promise<OrderDto>
   */
  async create(createOrder: OrderDto) {
    if (!_.isEmpty(createOrder.craftId) || _.isNumber(createOrder.qtyBought)) {
      const updatedCraftQty = await this.craftService.updateCraftQty(
        createOrder.craftId,
        createOrder.qtyBought,
      );
      if (!_.isUndefined(updatedCraftQty)) {
        return new this.orderModel({
          orderId: createOrder.orderId,
          craftId: createOrder.craftId,
          userId: createOrder.userId,
          totalPrice: createOrder.totalPrice,
        }).save();
      }
    }
  }

  /**
   * Usage - This method will be used to fetch all craft objects in the
   * crafts collection
   *
   * @returns @typedef Promise<OrderDto[]>
   */
  async findAll() {
    return this.orderModel.find();
  }

  /**
   * Usage - This method will be used to fetch an craft object for a
   * given craft  id from the craft  collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<OrderDto>
   */
  async findOne(id: string) {
    return this.orderModel.findById(id);
  }
}
