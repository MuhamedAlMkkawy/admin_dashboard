import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entities/clients.entities';
import { Repository } from 'typeorm';
import { CreateClientsSectionDto } from './dtos/createClients.dto';
import { UpdateClientsSectionDto } from './dtos/updateClients.dto';

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
  async postClients (data : CreateClientsSectionDto) {
    const clientsSection = await this.repo.find()



    if(clientsSection.length > 0){
      throw new BadRequestException('Clients Section Already Added');
    }
    const clientsData = {
      _id : 1 ,
      ...data
    }

    const newClientsSection = await this.repo.save(this.repo.create(clientsData))
    
    return newClientsSection;
  }




  // [ 3 ] UPDATE Clients Section
  async updateClients(data : UpdateClientsSectionDto){
    const clients = await this.repo.find();

    if(!data){
      throw new BadRequestException('No data provided to update clients section');
    }

    const clientsSectionID = clients[0]._id

    await this.repo.update({_id : clientsSectionID}, data)
    return {
      message : 'Client Section Updated Successfully',
      data : await this.repo.findOneBy({_id : clientsSectionID})
    }
  }
}
