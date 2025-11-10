import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeaturesDto } from './dtos/createFeatures.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';

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
  async addFeaturesSection(@Body() body : CreateFeaturesDto){
    const data = {
      ...body , 
      items : body.items.map((item , index) => ({id : index + 1 , ...item}))
    }

    const features = await this.featuresService.addFeaturesSection(data);
    
    return features;
  }
  

  // [ 3 ] Update Features Section
  @Patch()
  @UseInterceptors(TransformFlatToNestedInterceptor) 
  async updateFeaturesSection(@Body() body: any){
    if(!body){
      throw new BadRequestException('You Must Add Data to Continue...');
    }
    const updatedFeaturesSection = await this.featuresService.updateFeaturesSection(body);

    return updatedFeaturesSection;
  }
}
