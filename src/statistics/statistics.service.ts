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
  async updateStatistics(id: string, body: UpdateStatisticsDto) {
    const statisticsItem = await this.repo.findOneBy({
      _id: new ObjectId(id.toString()),
    });

    if (!statisticsItem) {
      throw new NotFoundException('Statistics Item Not Found');
    }

    // دمج البيانات القديمة مع البيانات الجديدة من body
    const newData = { ...statisticsItem };

    for (const key in body) {
      if (body[key] !== undefined) {
        // إذا كان الحقل كائن nested (مثل title أو description)
        if (
          typeof body[key] === 'object' &&
          body[key] !== null &&
          !Array.isArray(body[key])
        ) {
          newData[key] = {
            ...statisticsItem[key],
            ...body[key],
          };
        } else {
          // الحقول العادية (string, number, boolean, array)
          newData[key] = body[key];
        }
      }
    }

    await this.repo.update(id, newData);

    return {
      message: 'Statistics Updated Successfully',
      data: await this.repo.findOneBy({ _id: new ObjectId(id.toString()) }),
    };
  }

}
