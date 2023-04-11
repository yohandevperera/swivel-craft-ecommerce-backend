import { Injectable } from '@nestjs/common';
import { CraftDto } from './dto/create-update-craft.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Craft, CraftDocument } from 'src/schemas/craft.schema';
import { Model } from 'mongoose';

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
    return new this.craftsModel(createCraft).save();
  }

  /**
   * Usage - This method will be used to fetch all craft objects in the
   * crafts collection
   *
   * @returns @typedef Promise<CraftDto[]>
   */
  async findAll() {
    return this.craftsModel.find();
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
    return this.craftsModel.updateOne(
      { _id: id },
      { $set: { ...updateCraft } },
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

  async bulkInsertCraft(craft: any[]) {
    return this.craftsModel.insertMany(craft);
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
}
