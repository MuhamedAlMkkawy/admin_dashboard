import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Features } from './entities/features.entities';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
  imports: [TypeOrmModule.forFeature([Features])],
})
export class FeaturesModule {}
