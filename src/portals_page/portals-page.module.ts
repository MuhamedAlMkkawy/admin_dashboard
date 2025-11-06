import { Module } from '@nestjs/common';
import { PortalsPageController } from './portals-page.controller';
import { PortalsPageService } from './portals-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalsPage } from './entities/PortalsPage.entities';

@Module({
  controllers: [PortalsPageController],
  providers: [PortalsPageService],
  imports : [TypeOrmModule.forFeature([PortalsPage])]
})
export class PortalsPageModule {}
