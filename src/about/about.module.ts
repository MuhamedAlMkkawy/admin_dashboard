import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from './entities/about.entities';

@Module({
  controllers: [AboutController],
  providers: [AboutService],
  imports : [TypeOrmModule.forFeature([About])]
})
export class AboutModule {}
