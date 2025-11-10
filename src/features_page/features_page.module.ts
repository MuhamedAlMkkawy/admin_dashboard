import { Module } from '@nestjs/common';
import { FeaturesPageController } from './features_page.controller';
import { FeaturesPageService } from './features_page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesPage } from './entities/FeaturesPage.entities';

@Module({
  controllers: [FeaturesPageController],
  providers: [FeaturesPageService],
  imports: [TypeOrmModule.forFeature([FeaturesPage])],
})
export class FeaturesPageModule {}
