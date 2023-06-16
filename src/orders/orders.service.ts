import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/create-update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import mongoose, { Model } from 'mongoose';
import _ = require('lodash');
import { CraftsService } from 'src/crafts/crafts.service';

/**
 * Usage and Description - This file will directly call the
 * model and the defined orders collection to perfom the CRUD operations
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
   * Usage - This method will be used to create a order object in the
   * orders collection
   *
   * @parms orders @typedef OrderDto[]
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
      if (!_.isUndefined(updateCraftQty)) {
        return [];
      }
      return this.orderModel.insertMany(restrcutredOrderData);
    }
  }

  /**
   * Usage - This method will be used to fetch all orders objects in the
   * orders collection
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
   * Usage - This method will be used to fetch an order object for a
   * given order id from the orders collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<OrderDto>
   */
  async findOne(id: string) {
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
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
    ]);
  }

  /**
   * Usage - This method will be used to remove all orders in
   * the defined orders collection
   *
   * @returns @typedef Promise<any>
   */
  async bulkRemoveOrder() {
    return this.orderModel.remove({});
  }

  /**
   * Usage - This method will be used to fetch an order object and
   * craft details from the orders collection and crafts collection
   *
   * @returns @typedef Promise<any[]>
   */
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

   /**
   * Usage - This method will be used to fetch the top sales
   * using the craft id and order data
   *
   * @returns @typedef Promise<number>
   */
  async getTopSales() {
    const topSales = await this.orderModel.aggregate([
      { $group: { _id: '$craftId', totalOrders: { $sum: 1 } } },
      { $sort: { totalOrders: -1 } },
      { $limit: 1 },
    ]);
    return {
      topSales: topSales[0].totalOrders,
    };
  }

  
   /**
   * Usage - This method will be used to fetch the total sales
   * using the order data
   *
   * @returns @typedef Promise<number>
   */
  async getTotalSales() {
    const totalSales = await this.orderModel.count();
    return {
      totalSales: totalSales,
    };
  }
}
