import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entities';
import { Repository } from 'typeorm';
import { CreateHomeDto } from './dtos/CreateHomeDto.dto';
import { UpdateHomeDto } from './dtos/UpdateHomeDto.dto';
import { merge } from 'lodash';

@Injectable()
export class HomeService {
  constructor(@InjectRepository(Home) private repo : Repository<Home>){}

  // [ 1 ] Get Home Page 's Data
  async getHomeData(){
    const home = await this.repo.find()

    if(!home){
      throw new NotFoundException('No Content Found')
    }

    return home;
  }


  // [ 2 ] Post Home Page 's Data
  async createHomePage (body : CreateHomeDto) {
    const home = await this.repo.find()

    if(home.length > 0){
      throw new BadRequestException('Home Page Already Added')
    }

    const createdPage = this.repo.create(body)
    const savedPage = await this.repo.save(createdPage)
    
    return savedPage
  }



  // [ 3 ] Update Home Page 's Data
  async updateHomePage(body: UpdateHomeDto) {
    const homePage = await this.repo.find();

    if (homePage.length === 0) {
      throw new NotFoundException('There Is Not Home Page Data To Edit!!');
    }

    const homeID = homePage[0]?._id;
    const home = await this.repo.findOneBy({ _id: homeID });

    if (!home) {
      throw new NotFoundException('Home page not found');
    }

    // Perform a deep merge (preserves nested data)
    const updated = merge({}, home, body);
    const saved = await this.repo.save(updated);

    return {
      message: 'Home Page Updated Successfully',
      data: saved,
    };
  }

}
