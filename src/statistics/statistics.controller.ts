import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Statistics } from './entities/statistics.entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService : StatisticsService) {}

  // [ 1 ] Get All Statistics
  @Get()
  async getStatistics () {
    const statistics = await this.statisticsService.getStatistics()

    return statistics ;

  }



  // [ 2 ] Add Statistics Section
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('This type of files isn\'t supported'), false);
      }
      cb(null, true);
    },
  }))
  async postStatistics(@Body() data : any , @UploadedFile() file?: Express.Multer.File){
    const verifiedData = plainToClass(Statistics, data);

    if(!file){
      throw new Error('Image file is required for statistics');
    }

    const statisticsData = {
      ...verifiedData,
      image: `/uploads/${file.filename}`
    };
    
    const statistics = await this.statisticsService.postStatistics(statisticsData);

    return statistics;
  }



  // [ 3 ] Update Statistics Section
  @Patch('/:id')
    @UseInterceptors(
    FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('This type of files isn\'t supported'), false);
      }
      cb(null, true);
    },
  }))
  async updateStatistics(@Param('id') id:string , @Body() body : any , @UploadedFile() file?: Express.Multer.File){
    if(file){
      body.image = `/uploads/${file.filename}`;
    }
    
    const updateStatistics = await this.statisticsService.updateStatistics(id , body)


    return updateStatistics;
  }
}
