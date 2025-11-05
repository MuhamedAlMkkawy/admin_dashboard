import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from './entities/clients.entities';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports : [TypeOrmModule.forFeature([Clients])]
})
export class ClientsModule {}
