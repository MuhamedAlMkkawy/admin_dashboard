import { Module } from '@nestjs/common';
import { ModulesPageController } from './modules_page.controller';
import { ModulesPageService } from './modules_page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesPage } from './entities/modulesPage.entitites';

@Module({
  controllers: [ModulesPageController],
  providers: [ModulesPageService],
  imports : [TypeOrmModule.forFeature([ModulesPage])]
})
export class ModulesPageModule {}
