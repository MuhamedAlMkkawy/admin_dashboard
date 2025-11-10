import { BadRequestException, Body, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { FeaturesPageService } from './features_page.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { plainToClass } from 'class-transformer';
import { CreateFeaturesPageDto } from './dtos/CreateFeaturesPage.dto';

@Controller('features_page')
export class FeaturesPageController {
  constructor (private featuresPageService : FeaturesPageService){}

  // [ 1 ] GET THE FEATURES PAGE DATA
  @Get()
  async getFeaturesPageData () {
    const data = await this.featuresPageService.getFeaturesPageData();

    return data;
  }


  // [ 2 ] POST THE FEATURES PAGE DATA
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
    TransformFlatToNestedInterceptor,
    MergeFileFieldsInterceptor
  )
  async createFeaturesPageData (@Body() body : any) {
    if(!body) {
      throw new BadRequestException('You Must Add Data to Continue...');
    }

    const data = {
      ...body,
      info_items: body.info_items.map((item, index) => ({
        id: index + 1,
        ...item,
      })),
      unique_features: body.unique_features.map((item, index) => ({
        id: index + 1,
        ...item,
        items : item.items.map((item , index) => ({id : index + 1 , ...item}))
      })),
    }
    const featuresPage = await this.featuresPageService.createFeaturesPageData(data);

    return featuresPage
  }



  // [ 3 ] UPDATE THE FEATURES PAGE DATA
  @Patch()
    @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
    TransformFlatToNestedInterceptor,
    MergeFileFieldsInterceptor
  )
  async updateFeaturesPage(@Body() body : any) {
    if(!body){
      throw new BadRequestException('You Must Add Data to Continue...');
    }

    const updated = await this.featuresPageService.updateFeaturesPage(body);

    return updated
  }
}
