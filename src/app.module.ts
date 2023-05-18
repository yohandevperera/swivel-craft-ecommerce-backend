require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CraftCategoriesCommand } from './utls/seed-commands/craft-category.command';
import { CraftCategoriesModule } from './craft-categories/craft-categories.module';
import { CraftsModule } from './crafts/crafts.module';
import { CraftsCommand } from './utls/seed-commands/craft.command';
import { SeedAndRemoveAllCommand } from './utls/seed-commands/seed-remove-all.command';
import { UsersModule } from './users/users.module';

/**
 * Usage and Description - This file will act as the main
 * app wrapper combining the controller functions and the
 * service functions
 *
 **/

const developmentDBURL = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`;

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.SERVER_ENV == 'development'
        ? developmentDBURL
        : process.env.MONOGO_URL,
    ),
    CommandModule,
    CraftCategoriesModule,
    CraftsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CraftCategoriesCommand,
    CraftsCommand,
    SeedAndRemoveAllCommand,
  ],
})
export class AppModule {}
