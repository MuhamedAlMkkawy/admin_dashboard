import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entities';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [TypeOrmModule.forFeature([Statistics])],
})
export class StatisticsModule {}
