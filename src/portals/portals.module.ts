import { Module } from '@nestjs/common';
import { PortalsController } from './portals.controller';
import { PortalsService } from './portals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portals } from './entities/portals.entities';

@Module({
  controllers: [PortalsController],
  providers: [PortalsService],
  imports : [TypeOrmModule.forFeature([Portals])]
})
export class PortalsModule {}
