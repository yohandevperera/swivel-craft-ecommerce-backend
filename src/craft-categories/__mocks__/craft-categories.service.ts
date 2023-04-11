import { craftCategoryStub } from '../__tests__/stubs/craft-category.stub';
import { craftCategoriesStub } from '../__tests__/stubs/craft-categories.stub';

/**
 * Usage and Description - This file will return a mock serivice that will
 * act as a temp service that will be used for the unit testing
 **/

export const CraftCategoriesService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(craftCategoryStub()),
  findAll: jest.fn().mockResolvedValue(craftCategoriesStub()),
  create: jest.fn().mockResolvedValue(craftCategoryStub()),
  update: jest.fn().mockResolvedValue(craftCategoryStub()),
  remove: jest.fn().mockResolvedValue(craftCategoryStub()),
});
