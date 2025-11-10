import { BadRequestException, Body, Controller, Get, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AboutService } from './about.service';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateAboutDto } from './dtos/createAbout.dto';

@Controller('about')
export class AboutController {
  constructor(private aboutService : AboutService) {}

  // [ 1 ]  Get About Page 's Data 
  @Get()
  async getAboutData(){
    const aboutData = await this.aboutService.getAboutData()

    return aboutData;
  }



  // [ 2 ]  Create About Page 's Data 
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
  async createAboutPage (@Body() body : CreateAboutDto) {
    if(!body){
      throw new BadRequestException('You Must Add Data to Continue...')
    }

    const aboutData = await this.aboutService.createAboutPage(body);

    return aboutData;
  }




  // [ 3 ]  Update About Page 's Data 
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
  async updateAboutPage (@Body() body : any , @UploadedFiles() files : Array<Express.Multer.File>) {
    if(!body){
      throw new BadRequestException('You Must Add Data to Continue Updating')
    }


    const updatedData = await this.aboutService.updateAboutData(body)

    return updatedData;
  }
}
