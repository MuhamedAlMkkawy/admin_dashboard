import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Features } from './entities/features.entities';
import { Repository } from 'typeorm';
import { CreateFeaturesDto } from './dtos/createFeatures.dto';
import {merge} from 'lodash'
import { UpdateFeaturesDto } from './dtos/updateFeatures.dto';
@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Features) 
    private repo : Repository<Features> 
  ) {}

  // [ 1 ] Get all features
  async getAllFeatures(){
    const features  = await this.repo.find()

    if(!features){
      throw new NotFoundException('No features found');
    }

    return features;
  }




  // [ 2 ] Add Features Section
  async addFeaturesSection(data : CreateFeaturesDto){
    const isFeaturesExisted = await this.repo.find();
    
    if(isFeaturesExisted.length){
      throw new ForbiddenException('Features already existed');
    }

    const features = this.repo.create(data);


    const addedFeatures = await this.repo.save(features);

    return addedFeatures;
  }



  // [ 3 ] Update Features Section
  async updateFeaturesSection(data: UpdateFeaturesDto) {
    const featuresSection = await this.repo.find();
    
    if (!featuresSection.length) {
      throw new NotFoundException('No features section found to update');
    }

    const updatedFeatures = merge({}, featuresSection[0], data);
    // Correct update syntax - update where _id matches, set the data
    
    const updated = await this.repo.save(updatedFeatures);
    

    return {
      message: 'Features section updated successfully',
      data:  updated
    };
  }
  
  
}
