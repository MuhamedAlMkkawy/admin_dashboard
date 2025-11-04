import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entities';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class StatisticsService {
  constructor(@InjectRepository(Statistics) private repo : Repository<Statistics>) {}

  // [ 1 ] Get All Statistics
  async getStatistics () {
    const statistics = await this.repo.find()

    if(!statistics){
      throw new NotFoundException('No Data Found')
    }


    return statistics;
  }



  // [ 2 ] Add Statistics Section
  async postStatistics(data : Statistics){
    const statistics = this.repo.create(data);

    if(!statistics){
      throw new Error('Failed to create statistics');
    }

    const savedStatistics = await this.repo.save(statistics);

    return savedStatistics;
  }




  // [ 3 ] Update Statistics Section
  async updateStatistics (id : string , body : any){
    const statisticsItem = await this.repo.findOneBy({_id: new ObjectId(id.toString())})
  
    if(!statisticsItem){
      throw new NotFoundException('Statistics Item Not Found')
    }
    
    await this.repo.update(id  ,  body);

    return {
      message : 'Statistics Updated Successfully',
      data : await this.repo.findOneBy({_id: new ObjectId(id.toString())})
    };
  }
}
