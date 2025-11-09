import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entities';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UpdateStatisticsDto } from './dtos/UpdateStatistics.dto';

@Injectable()
export class StatisticsService {
  constructor(@InjectRepository(Statistics) private repo : Repository<Statistics>) {}

  // [ 1 ] Get All Statistics
  async getStatistics (lang : string) {
    const statistics = await this.repo.find()

    if(!statistics){
      throw new NotFoundException('No Data Found')
    }

    const statisticsData = statistics.map(statistics => ({
      ...statistics,
      title : statistics.title[lang]
    }))

    return statisticsData
  }



  // [ 2 ] Add Statistics Section
  async postStatistics(data : any){
    const statistics = this.repo.create(data);

    if(!statistics){
      throw new Error('Failed to create statistics');
    }

    const savedStatistics = await this.repo.save(statistics);

    return savedStatistics;
  }




  // [ 3 ] Update Statistics Section
  async updateStatistics (id : string , body :UpdateStatisticsDto){
    const statisticsItem = await this.repo.findOneBy({_id: new ObjectId(id.toString())})
    

    console.log(body)
    if(!statisticsItem){
      throw new NotFoundException('Statistics Item Not Found')
    }
      
    const newData = { ...statisticsItem };

    if (body.title) {
      newData.title = {
        ...statisticsItem.title,
        ...body.title,
      };
    }
    
    await this.repo.update(id  ,  newData);

    return {
      message : 'Statistics Updated Successfully',
      data : await this.repo.findOneBy({_id: new ObjectId(id.toString())})
    };
  }
}
