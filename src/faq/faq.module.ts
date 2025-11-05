import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entities';

@Module({
  controllers: [FaqController],
  providers: [FaqService],
  imports : [TypeOrmModule.forFeature([Faq])]
})
export class FaqModule {}
