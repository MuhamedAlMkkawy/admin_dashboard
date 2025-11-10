import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entities/clients.entities';
import { Repository } from 'typeorm';
import { CreateClientsDto } from './dtos/createClients.dto';
import { UpdateClientsDto } from './dtos/updateClients.dto';
import {merge} from 'lodash'
@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Clients) private repo : Repository<Clients>) {}

  // [ 1 ] GET Clients Section
  async getClients () {
    const clients = await this.repo.find();

    if(!clients){
      throw new NotFoundException('No Clients Found Yet!');
    }
    
    return clients[0];
  }



  // [ 2 ] POST Clients Section
  async postClients (data : CreateClientsDto) {
    const clientsSection = await this.repo.find()



    if(clientsSection.length > 0){
      throw new BadRequestException('Clients Section Already Added');
    }


    const newClientsSection = await this.repo.save(this.repo.create(data))
    
    return newClientsSection;
  }




  // [ 3 ] UPDATE Clients Section
  async updateClients(data : UpdateClientsDto){
    const clients = await this.repo.find();

    if(!data){
      throw new BadRequestException('No data provided to update clients section');
    }

    const updatedData = merge({} , clients[0] , data)
    const updated = await this.repo.save(updatedData)


    return {
      message : 'Client Section Updated Successfully',
      data : updated
    }
  }
}
