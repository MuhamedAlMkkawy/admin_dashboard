import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portals } from './entities/portals.entities';
import { Repository } from 'typeorm';
import { UpdateClientsSectionDto } from 'src/clients/dtos/updateClients.dto';
import { CreatePortalsDto } from './dtos/createPortals.dto';

@Injectable()
export class PortalsService {
  constructor(@InjectRepository(Portals) private repo : Repository<Portals>) {}


  // [ 1 ] GET Portals Section
  async getPortalsData () {
    const portalsData = await this.repo.find()

    if(!portalsData.length){
      throw new NotFoundException('No Contnet Found!')
    }

    return portalsData[0]
  }



  // [ 2 ] POST Portals Section
  async postPortalsSection(data : CreatePortalsDto){
    const portalsSection = await this.repo.find()

    if(portalsSection.length > 0) {
      throw new NotFoundException('Portals Section Already Added')
    }


    const newPortalsSection = await this.repo.save(this.repo.create(data))

    return newPortalsSection;
  }



  // [ 3 ] UPDATE Portals Section
  async updatePortalsSection(data : UpdateClientsSectionDto) {
    const portals = await this.repo.find()

    if(!portals){
      throw new NotFoundException('The Portals Section isn\'t Found')
    }

    const portalsSectionID = portals[0]._id

    await this.repo.update({_id : portalsSectionID} , data)

    return{
      message : 'Portals Section Updated Successfully',
      data : await this.repo.findOneBy({_id : portalsSectionID})
    }
  }
}
