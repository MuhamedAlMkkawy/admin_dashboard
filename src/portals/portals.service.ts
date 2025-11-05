import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portals } from './entities/portals.entities';
import { Repository } from 'typeorm';

@Injectable()
export class PortalsService {
  constructor(@InjectRepository(Portals) private repo : Repository<Portals>) {}


  // [ 1 ] GET Portals Section
  async getPortalsData () {
    const portalsData = await this.repo.find()

    if(!portalsData.length){
      throw new NotFoundException('No Contnet Found!')
    }

    return portalsData
  }



  // [ 2 ] POST Portals Section
  async postPortalsSection(data : any){}
}
