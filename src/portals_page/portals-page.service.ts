import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortalsPage } from './entities/PortalsPage.entities';
import { Repository } from 'typeorm';
import { CreatePortalsPageDto } from './dtos/createPortalsPageData.dto';
import { UpdatePortalsPageDto } from './dtos/updatePortalsPageData.dto';
import {merge} from 'lodash'
@Injectable()
export class PortalsPageService {
  constructor(@InjectRepository(PortalsPage) private repo : Repository<PortalsPage>){}

  // [ 1 ] Get Portals Page 's Content
  async getPortalsPageData () {
    const data = await this.repo.find()

    if(!data) {
      throw new NotFoundException('No Content Found!!')
    }

    return data
  }



  // [ 2 ] Create Portals Page 's Content
  async createPortalsPageData (body : CreatePortalsPageDto) {
    const portalsPage = await this.repo.find()

    if(portalsPage.length > 0){
      throw new BadRequestException('Portals Page Data is Already Found !!')
    }

    const data = await this.repo.save(this.repo.create(body))

    return data

  }



  // [ 3 ] Update Portals Page 's Content
  async updatePortalsPageData(body : UpdatePortalsPageDto){
    const portalsPage = await this.repo.find()
    if(!portalsPage){
      throw new BadRequestException('Portlas Page Data Not Found !!')
    }

    const portalsID = portalsPage[0]._id
    const portals = await this.repo.findOneBy({_id : portalsID})

    if(!portals){
      throw new NotFoundException('Portals Page \'s Data isn\'t Found !!!')
    }


    const updated = merge({} , portals , body)

    const savedData = await this.repo.save(updated)

    return {
      message : 'Portals Page \'s Data is Updated SuccessFully..',
      data : savedData
    }
  }
}

