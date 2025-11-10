import { BadRequestException, Body, Controller, Get, NotFoundException, Patch, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PortalsPageService } from './portals-page.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformArrays.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { CreatePortalsPageDto } from './dtos/createPortalsPageData.dto';
import { plainToClass } from 'class-transformer';
import { UpdatePortalsPageDto } from './dtos/updatePortalsPageData.dto';
import { Console } from 'console';
import { LanguageInterceptor } from 'src/interceptors/languageHandle.interceptor';

@Controller('portals_page')
export class PortalsPageController {
  constructor(private portalsPageService : PortalsPageService){}
  
  // [ 1 ] Get Portals Page 's Content
  @Get()
  @UseInterceptors(LanguageInterceptor)
  async getPortalsPageData (){ 
    const data = await this.portalsPageService.getPortalsPageData()

    return data;
  }



  // [ 2 ] Create Portals Page 's Content
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
  async createPortalsPageData (@Body() body : any) {
    if(!body){
      throw new BadRequestException('You Must Add data to Continue...')
    }

    const data = plainToClass(CreatePortalsPageDto, body)


    const portalsData = {
      ...data,
      portals: data.portals.map((item, index) => ({
        ...item,
        id: index + 1
      })),
      mockup : {
        id : 1,
        ...data.mockup,
      }
    }

    return this.portalsPageService.createPortalsPageData(portalsData)
  }




  // [ 3 ] Update Portals Page 's Content
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
    MergeFileFieldsInterceptor,
  )
  async updatePortalsPageData (@Body() body : any ){
    if(!body){
      throw new NotFoundException('You should add data to continue... !!')
    }

    return this.portalsPageService.updatePortalsPageData(body)
  }
}
