import { Injectable } from '@nestjs/common';
import { CraftCategoryDto } from './dto/create-update-craft-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  CraftCategory,
  CraftCategoryDocument,
} from 'src/schemas/craft.category.schema';
import { Model } from 'mongoose';

/**
 * Usage and Description - This file will directly call the
 * model and the defined craft category collection to perfom the CRUD operations
 *
 **/

@Injectable()
export class CraftCategoriesService {
  constructor(
    @InjectModel(CraftCategory.name)
    private craftCategoriesModel: Model<CraftCategoryDocument>,
  ) {}

  /**
   * Usage - This method will be used to create a craft category object in the
   * craft category collection
   *
   * @parms createCraftCategory @typedef CraftCategoryDto
   * @returns @typedef Promise<CraftCategoryDto>
   */
  async create(createCraftCategory: CraftCategoryDto) {
    return new this.craftCategoriesModel(createCraftCategory).save();
  }

  /**
   * Usage - This method will be used to fetch all craft category objects in the
   * craft category collection
   *
   * @returns @typedef Promise<CraftCategoryDto[]>
   */
  async findAll() {
    return this.craftCategoriesModel.find();
  }

  /**
   * Usage - This method will be used to fetch an craft category object for a
   * given craft category id from the craft category collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<CraftCategoryDto>
   */
  async findOne(id: string) {
    return this.craftCategoriesModel.findById(id);
  }

  /**
   * Usage - This method will be used to update a craft category object for a
   * given craft category id in the craft category collection
   *
   * @parms id @typedef string
   * @parms updateCraftCategory @typedef CraftCategoryDto
   * @returns @typedef Promise<CraftCategoryDto>
   */
  async update(id: string, updateCraftCategory: CraftCategoryDto) {
    return this.craftCategoriesModel.updateOne(
      { _id: id },
      { $set: { ...updateCraftCategory } },
    );
  }

  /**
   * Usage - This method will be used to remove a craft category object for a
   * given craft category in the craft category collection
   *
   * @parms id @typedef string
   * @returns @typedef Promise<CraftCategoryDto>
   */
  async remove(id: string) {
    return this.craftCategoriesModel.deleteOne({ id });
  }

  /**
   * Usage - This method will be used to seed multiple craft categories to
   * the defined craft category collection
   *
   * Note - this method will be used only in the defined seeders
   *
   * @parms craftCategories @typedef CraftCategoryDto[]
   * @returns @typedef Promise<CraftCategoryDto[]>
   */

  async bulkInsertCraftCategories(craftCategories: CraftCategoryDto[]) {
    return this.craftCategoriesModel.insertMany(craftCategories);
  }

  /**
   * Usage - This method will be used to remove all craft categories in
   * the defined craft category collection
   *
   * Note - this method will be used only in the defined seeders
   *
   * @returns @typedef Promise<any>
   */
  async bulkRemoveCraftCategories() {
    return this.craftCategoriesModel.remove({});
  }
}
