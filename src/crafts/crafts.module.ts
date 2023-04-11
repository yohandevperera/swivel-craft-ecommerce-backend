import { Logger, Module } from '@nestjs/common';
import { CraftsService } from './crafts.service';
import { CraftsController } from './crafts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Craft, CraftSchema } from 'src/schemas/craft.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Craft.name,
        schema: CraftSchema,
      },
    ]),
  ],
  controllers: [CraftsController],
  providers: [CraftsService, Logger],
  exports: [CraftsService],
})
export class CraftsModule {}
