import { Test, TestingModule } from '@nestjs/testing';
import { CraftCategoriesController } from './craft-categories.controller';
import { CraftCategoriesService } from './craft-categories.service';

describe('CraftCategoriesController', () => {
  let controller: CraftCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CraftCategoriesController],
      providers: [CraftCategoriesService],
    }).compile();

    controller = module.get<CraftCategoriesController>(
      CraftCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
