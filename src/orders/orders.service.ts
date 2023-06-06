import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/create-update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import mongoose, { Model } from 'mongoose';
import _ = require('lodash');
import { CraftsService } from 'src/crafts/crafts.service';
import { Craft } from 'src/schemas/craft.schema';
import { User } from 'src/schemas/user.schema';

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
  async create(orders: OrderDto[]) {
    if (!_.isEmpty(orders)) {
      let updateCraftQty;
      orders.map(async (order: OrderDto) => {
        updateCraftQty = await this.craftService.updateCraftQty(
          order.craftId,
          order.qtyBought,
        );
      });
      const restrcutredOrderData = orders.map((order: OrderDto) => ({
        craftId: new mongoose.Types.ObjectId(order.craftId),
        userId: new mongoose.Types.ObjectId(order.userId),
        orderId: order.orderId,
        totalPrice: order.totalPrice,
      }));
      console.log(restrcutredOrderData);
      if (!_.isUndefined(updateCraftQty)) {
        return [];
      }
      return this.orderModel.insertMany(restrcutredOrderData);
    }
  }

  /**
   * Usage - This method will be used to fetch all craft objects in the
   * crafts collection
   *
   * @returns @typedef Promise<OrderDto[]>
   */
  async findAll() {
    return this.orderModel.aggregate([
      {
        $lookup: {
          from: 'crafts',
          localField: 'craftId',
          foreignField: '_id',
          as: 'crafts_info',
        },
      },
      { $unwind: '$crafts_info' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'users_info',
        },
      },
      { $unwind: '$users_info' },
      {
        $project: {
          _id: 1,
          totalPrice: 1,
          itemName: '$crafts_info.name',
          itemPrice: '$crafts_info.price',
          orderId: 1,
          email: '$users_info.email',
        },
      },
    ]);
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

  async bulkRemoveOrder() {
    return this.orderModel.remove({});
  }

  async getOrders() {
    return this.orderModel.aggregate([
      {
        $lookup: {
          from: 'crafts',
          localField: 'craftId',
          foreignField: '_id',
          as: 'crafts_info',
        },
      },
      { $unwind: '$crafts_info' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'users_info',
        },
      },
      { $unwind: '$users_info' },

      {
        $project: {
          _id: 1,
          totalPrice: 1,
          orderId: 1,
          email: '$users_info.email',
        },
      },
    ]);
  }
}
