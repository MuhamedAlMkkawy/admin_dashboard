import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Features } from './entities/features.entities';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/createFeatures.dto';
import { UpdateFeatureDto } from './dtos/UpdateFeatures.dto';

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
  async addFeaturesSection(data : CreateFeatureDto){
    const isFeaturesExisted = await this.repo.find();
    
    if(isFeaturesExisted.length){
      throw new ForbiddenException('Features already existed');
    }

    const features = this.repo.create({_id: 1 , ...data});


    const addedFeatures = await this.repo.save(features);

    return addedFeatures;
  }



  // [ 3 ] Update Features Section
  async updateFeaturesSection(data: any) {
    const featuresSection = await this.repo.find();
    
    if (!featuresSection.length) {
      throw new NotFoundException('No features section found to update');
    }

    // Get the actual ID from the found entity
    const featureId = featuresSection[0]._id;
    

    // Correct update syntax - update where _id matches, set the data
    const updated = await this.repo.update(
      { _id: featureId }, // Filter
      data // Update data
    );

    return {
      message: 'Features section updated successfully',
      data:  await this.repo.findOneBy({ _id: featureId })
    };
  }
  
  
}
