import { Injectable } from '@nestjs/common';
import { CraftDto } from './dto/create-update-craft.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Craft, CraftDocument } from 'src/schemas/craft.schema';
import mongoose, { Model } from 'mongoose';
import _ = require('lodash');

/**
 * Usage and Description - This file will directly call the
 * model and the defined craft collection to perfom the CRUD operations
 *
 **/

@Injectable()
export class CraftsService {
  constructor(
    @InjectModel(Craft.name)
    private craftsModel: Model<CraftDocument>,
  ) {}

  /**
   * Usage - This method will be used to create a craft object in the
   * craft collection
   *
   * @parms createCraft @typedef CraftDto
   * @returns @typedef Promise<CraftDto>
   */
  async create(createCraft: CraftDto) {
    const restrcutredCreateCraft = {
      categoryId: new mongoose.Types.ObjectId(createCraft.categoryId),
      description: createCraft.description,
      name: createCraft.name,
      photo: createCraft.photo,
      price: createCraft.price,
      qty: createCraft.qty,
    };
    return new this.craftsModel(restrcutredCreateCraft).save();
  }

  /**
   * Usage - This method will be used to fetch all craft objects in the
   * crafts collection
   *
   * @returns @typedef Promise<CraftDto[]>
   */
  async findAll() {
    return this.craftsModel.aggregate([
      {
        $lookup: {
          from: 'craftcategories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'crafts_category_info',
        },
      },
      { $unwind: '$crafts_category_info' },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          qty: 1,
          price: 1,
          photo: 1,
          categoryName: '$crafts_category_info.name',
        },
      },
    ]);
  }

  /**
   * Usage - This method will be used to fetch an craft object for a
   * given craft  id from the craft  collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<CraftDto>
   */
  async findOne(id: string) {
    return this.craftsModel.findById(id);
  }

  /**
   * Usage - This method will be used to update a craft  object for a
   * given craft  id in the craft  collection
   *
   * @parms id @typedef string
   * @parms updateCraft @typedef CraftDto
   * @returns @typedef Promise<CraftDto>
   */
  async update(id: string, updateCraft: CraftDto) {
    const restrcutredUpdateCraft = {
      categoryId: new mongoose.Types.ObjectId(updateCraft.categoryId),
      description: updateCraft.description,
      name: updateCraft.name,
      photo: updateCraft.photo,
      price: updateCraft.price,
      qty: updateCraft.qty,
    };
    return this.craftsModel.updateOne(
      { _id: id },
      { $set: { ...restrcutredUpdateCraft } },
    );
  }

  /**
   * Usage - This method will be used to remove a craft  object for a
   * given craft  in the craft  collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<CraftDto>
   */
  async remove(id: string) {
    return this.craftsModel.deleteOne({ id });
  }

  /**
   * Usage - This method will be used to seed multiple craft to
   * the defined craft collection
   *
   * Note - this method will be used only in the defined seeders
   *
   * @parms craft @typedef CraftDto[]
   * @returns @typedef Promise<CraftDto[]>
   */

  async bulkInsertCraft(crafts: any[]) {
    if (!_.isEmpty(crafts)) {
      const restrcutredCraftData: any[] = crafts.map((craft: CraftDto) => ({
        categoryId: new mongoose.Types.ObjectId(craft.categoryId),
        description: craft.description,
        name: craft.name,
        photo: craft.photo,
        price: craft.price,
        qty: craft.qty,
      }));
      return this.craftsModel.insertMany(restrcutredCraftData);
    }
  }

  /**
   * Usage - This method will be used to remove all craft  in
   * the defined craft  collection
   *
   * Note - this method will be used only in the defined seeders
   *
   * @returns @typedef Promise<any>
   */
  async bulkRemoveCraft() {
    return this.craftsModel.remove({});
  }

  async findCraftByName(name: string) {
    return this.craftsModel.find(
      { name: name },
      { name: 1, description: 1, qty: 1, price: 1, photo: 1, categoryId: 1 },
    );
  }

  async updateCraftQty(craftId: string, qtyBought: number) {
    try {
      if (!_.isEmpty(craftId) || _.isNumber(qtyBought)) {
        const craftItemStockQty = await this.craftsModel.find(
          { _id: craftId },
          { qty: 1 },
        );
        if (_.isNumber(craftItemStockQty[0].qty)) {
          const updatedQty = craftItemStockQty[0].qty - qtyBought;
          return this.craftsModel.updateOne(
            { _id: craftId },
            {
              $set: {
                qty: updatedQty,
              },
            },
          );
        }
      }
    } catch (error) {
      return error;
    }
  }
}
