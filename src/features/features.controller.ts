import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dtos/createFeatures.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformArrays.interceptor';

@Controller('features')
@UseInterceptors(FileInterceptor(''))
export class FeaturesController {
  constructor(private featuresService : FeaturesService) {}

  // [ 1 ] Get All Features
  @Get()
  async getAllFeatures(){
    const features = await this.featuresService.getAllFeatures();


    return features;
  }


  // [ 2 ] Add Features Section
  @Post()
  @UseInterceptors(TransformFlatToNestedInterceptor) 
  async addFeaturesSection(@Body() body : CreateFeatureDto){    
    const features = await this.featuresService.addFeaturesSection(body);
    
    return features;
  }
  

  // [ 3 ] Update Features Section
  @Patch()
  @UseInterceptors(TransformFlatToNestedInterceptor) 
  async updateFeaturesSection(@Body() body: any){
    const updatedFeaturesSection = await this.featuresService.updateFeaturesSection(body);

    return updatedFeaturesSection;
  }
}
