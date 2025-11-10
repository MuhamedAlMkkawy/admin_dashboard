import { BadRequestException, Body, Controller, Get, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { HomeService } from './home.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { CreateHomeDto } from './dtos/CreateHomeDto.dto';

@Controller('home')
export class HomeController {
  
  constructor(private homeService : HomeService){}

  // [ 1 ] Get Home Page 's Data
  @Get()
  async getHomePage() {
    const home = await this.homeService.getHomeData()


    return home;
  }


  // [ 2 ] Post Home Page 's Data
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
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
    TransformFlatToNestedInterceptor,
    MergeFileFieldsInterceptor
  )
  async createHomePage(@Body() body : CreateHomeDto){
    const data = {
      heroSection : { id : 1 , ...body.heroSection },
      getMore : { id : 1 , ...body.getMore },
      portals: body.portals.map((item, index) => ({  id: index + 1 ,  ...item })),
    }

    const homeSection = await this.homeService.createHomePage(data)


    return homeSection;
  }


  // [ 3 ] Update Home Page 's Data
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
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
    TransformFlatToNestedInterceptor,
    MergeFileFieldsInterceptor
  )
  async updateHomePage(@Body() body : any) {
    if(!body) {
      throw new BadRequestException('No Data Found To Update')
    }
    const updatedData = await this.homeService.updateHomePage(body)

    return updatedData;
  }

}
