import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeaturesPage } from './entities/FeaturesPage.entities';
import { Repository } from 'typeorm';
import { CreateFeaturesPageDto } from './dtos/CreateFeaturesPage.dto';
import { UpdateFeaturesPageDto } from './dtos/UpdateFeaturesPage.dto';
import {merge} from 'lodash'
@Injectable()
export class FeaturesPageService {

  constructor(@InjectRepository(FeaturesPage) private repo : Repository<FeaturesPage>){}

  // [ 1 ] GET THE FEATURES PAGE DATA
  async getFeaturesPageData () {
    const data = await this.repo.find();

    if(data.length === 0) throw new NotFoundException('No content found!!')

    return data
  }


  // [ 2 ] POST THE FEATURES PAGE DATA
  async createFeaturesPageData(data : CreateFeaturesPageDto){
    const featuresPage = await this.repo.find();

    if(featuresPage.length > 0) {
      throw new BadRequestException('Features Page Data is Already Found !!')
    }
      
    const createdData = this.repo.create(data)
    const savedData = await this.repo.save(createdData);
    
    return savedData
  }


  // [ 3 ] UPDATE THE FEATURES PAGE DATA
  async updateFeaturesPage(data : UpdateFeaturesPageDto) {
    const featuresPage = await this.repo.find();

    if(!featuresPage) {
      throw new NotFoundException('Features Page Data isn\'t Found !!')
    }

    const updatedData = merge({} , featuresPage[0] , data)
    const updated = await this.repo.save(updatedData)

    return {
      message : 'Features Page Is Updated Successfully',
      data : updated
    }
  }
}
