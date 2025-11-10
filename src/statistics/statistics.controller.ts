import { Body, Controller, Get, Param, Patch, Post, Req , UseInterceptors } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformArrays.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { AddStatisticsDto } from './dtos/AddStatistics.dto';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { StatisticsResponceDto } from './dtos/StatisticsResponce.dto';
import { UpdateStatisticsDto } from './dtos/UpdateStatistics.dto';
import { LanguageInterceptor } from 'src/interceptors/languageHandle.interceptor';


@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService : StatisticsService) {}
  
  // [ 1 ] Get All Statistics
  @Get()
  @UseInterceptors(LanguageInterceptor)
  @Serialize(StatisticsResponceDto)
  async getStatistics () {
    const statistics = await this.statisticsService.getStatistics()

    return statistics ;

  }



  // [ 2 ] Add Statistics Section
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
  async postStatistics(@Body() data : AddStatisticsDto ){
    const statistics = await this.statisticsService.postStatistics(data);

    return statistics;
  }



  // [ 3 ] Update Statistics Section
  @Patch('/:id')
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
  async updateStatistics(@Param('id') id:string , @Body() body : any){
    const updateStatistics = await this.statisticsService.updateStatistics(id , body)


    return updateStatistics;
  }
}
