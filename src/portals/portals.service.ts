import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portals } from './entities/portals.entities';
import { Repository } from 'typeorm';
import { CreatePortalsDto } from './dtos/createPortals.dto';
import { UpdatePortalsDto } from './dtos/updatePortals.dto';
import {merge} from 'lodash'
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
  async updatePortalsSection(data : UpdatePortalsDto) {
    const portals = await this.repo.find()

    if(!portals){
      throw new NotFoundException('The Portals Section isn\'t Found')
    }

    const portalsData = merge({} , portals[0] , data)

    const savedData = await this.repo.save(portalsData)

    return{
      message : 'Portals Section Updated Successfully',
      data : savedData
    }
  }
}
