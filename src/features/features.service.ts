import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Features } from './entities/features.entities';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/features.dto';

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




  // [ 2 ] Add a new feature
  async addFeatures(data : CreateFeatureDto){
    const isFeaeturesExist = await this.repo.find();

    if(isFeaeturesExist){
      throw new BadRequestException('Features already exists');
    }


    const features = this.repo.create(data);

    if(!features){
      throw new NotFoundException('Could not create features');
    }


    const addedFeatures = await this.repo.save(features);

    return addedFeatures;
  }
  // [ 3 ] Update a feature5
  // [ 4 ] Delete a feature
}
