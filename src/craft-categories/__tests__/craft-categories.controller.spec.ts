import { Test, TestingModule } from '@nestjs/testing';
import { CraftCategoriesController } from '../craft-categories.controller';
import { CraftCategoriesService } from '../craft-categories.service';
import { Logger } from '@nestjs/common';
import { craftCategoryStub } from './stubs/craft-category.stub';
import { craftCategoriesStub } from './stubs/craft-categories.stub';

/**
 * Usage and Description - This file will consists all the test cases
 * that will run to check all the controller functions
 **/

jest.mock('../craft-categories.service');

describe('Craft-Categories Controller Unit Test', () => {
  let craftCategoryController: CraftCategoriesController;
  let craftCategoryService: CraftCategoriesService;

  // This function will run as a initializer to create the testing environment
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CraftCategoriesController],
      providers: [CraftCategoriesService, Logger],
    }).compile();

    craftCategoryController = moduleRef.get<CraftCategoriesController>(
      CraftCategoriesController,
    );
    craftCategoryService = moduleRef.get<CraftCategoriesService>(
      CraftCategoriesService,
    );
    jest.clearAllMocks();
  });

  // This test case will validate if a single craft category can be retrieved by giving an id
  describe('Get a single craft category', () => {
    describe('when findOne is called', () => {
      let craftCategory: any;
      beforeEach(async () => {
        craftCategory = await craftCategoryController.findOne({
          id: craftCategoryStub()._id,
        });
      });
      it('should call the craft category service', () => {
        expect(craftCategoryService.findOne).toBeCalled();
      });
      it('should return a craft category', () => {
        expect(craftCategory.data).toStrictEqual(craftCategoryStub());
      });
    });
  });

  // This test case will validate if all craft categories can be retrieved
  describe('Get all craft categories', () => {
    describe('when findAll is called', () => {
      let craftCategory: any;
      beforeEach(async () => {
        craftCategory = await craftCategoryController.findAll();
      });
      it('should call the craft category service', () => {
        expect(craftCategoryService.findAll).toBeCalled();
      });
      it('should return all craftCategorys', () => {
        expect(craftCategory.data).toStrictEqual(craftCategoriesStub());
      });
    });
  });

  // This test case will validate if a craft category can be created
  describe('Create craft category', () => {
    describe('when create is called', () => {
      let craftCategory: any;
      beforeEach(async () => {
        craftCategory = await craftCategoryController.create(
          craftCategoryStub(),
        );
      });
      it('should call the craftCategoryService', () => {
        expect(craftCategoryService.create).toBeCalled();
      });
      it('should return the created craft category', () => {
        expect(craftCategory.data).toStrictEqual(craftCategoryStub());
      });
    });
  });

  // This test case will validate if a craft category can be updated
  describe('Update craft category', () => {
    describe('when update is called', () => {
      let craftCategory: any;
      beforeEach(async () => {
        craftCategory = await craftCategoryController.update(
          craftCategoryStub()._id,
          craftCategoryStub(),
        );
      });
      it('should call the craftCategoryService', () => {
        expect(craftCategoryService.update).toBeCalled();
      });
      it('should return the updated craft category', () => {
        expect(craftCategory.data).toStrictEqual(craftCategoryStub());
      });
    });
  });

  // This test case will validate if a craft category can be removed
  describe('Remove a craft category', () => {
    describe('when remove is called', () => {
      let craftCategory: any;
      beforeEach(async () => {
        craftCategory = await craftCategoryController.remove(
          craftCategoryStub()._id,
        );
      });
      it('should call the craftCategoryService', () => {
        expect(craftCategoryService.remove).toBeCalled();
      });
      it('should return the removed craft category', () => {
        expect(craftCategory.data).toStrictEqual(craftCategoryStub());
      });
    });
  });
});
