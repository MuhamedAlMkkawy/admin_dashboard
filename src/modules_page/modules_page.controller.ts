import { Body, Controller, Get, NotFoundException, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ModulesPageService } from './modules_page.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { UpdateModulesPageDto } from './dtos/updateModulesPage.dto';

@Controller('modules_page')
export class ModulesPageController {
  constructor(private modulesPageService : ModulesPageService) {}

  // [ 1 ] GET the modules page data
  @Get()
  async getModulesPageData () {
    const data = await this.modulesPageService.getModulesPage()

    return data;
  }


  // [ 2 ] Create the modules page data
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
  async createModulesPageData(@Body() body : any) {
    if(!body) {
      throw new NotFoundException('You should add data to continue... !!')
    }

    const data = {
      info_items : body.info_items.map((item , index) => ({id : index + 1 , ...item})),
      modules : body.modules.map((item , index) => ({id : index + 1 , ...item}))
    }

    return this.modulesPageService.createModulesPageData(data)
  }



  // [ 3 ] Update the modules page data
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
  async updateModulesPageData(@Body() body : any) {
    if(!body) {
      throw new NotFoundException('You should add data to continue... !!')
    }
    const updated = await this.modulesPageService.updateModulesPageData(body)

    return updated
  }
}
