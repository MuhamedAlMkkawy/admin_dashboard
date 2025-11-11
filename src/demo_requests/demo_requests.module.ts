import { Module } from '@nestjs/common';
import { DemoRequestsController } from './demo_requests.controller';
import { DemoRequestsService } from './demo_requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoRequests } from './entities/demo_request.entities';

@Module({
  controllers: [DemoRequestsController],
  providers: [DemoRequestsService],
  imports : [TypeOrmModule.forFeature([DemoRequests])]
})
export class DemoRequestsModule {}
