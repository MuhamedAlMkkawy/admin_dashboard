import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dtos/createFeatures.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformArrays.interceptor';

@Controller('features')
@UseInterceptors(FileInterceptor(''))
export class FeaturesController {
  constructor(private featuresService : FeaturesService) {}

  // [ 1 ] Get all features
  @Get()
  async getAllFeatures(){
    const features = await this.featuresService.getAllFeatures();


    return features;
  }



  // [ 2 ] Add a new feature
  @Post()
  @UseInterceptors(TransformFlatToNestedInterceptor) 
  async addFeatures(@Body() body : CreateFeatureDto){    
    const features = await this.featuresService.addFeatures(body);
    
    return features;
  }


  // [ 3 ] Update a feature
  // [ 4 ] Delete a feature
}
