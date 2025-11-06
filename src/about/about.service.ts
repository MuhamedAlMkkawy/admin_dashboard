import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from './entities/about.entities';
import { Repository } from 'typeorm';
import { CreateAboutDto } from './dtos/createAbout.dto';
import { UpdateAboutDto } from './dtos/updateAbout.dto';
import {merge} from 'lodash'
@Injectable()
export class AboutService {
  constructor(@InjectRepository(About) private repo : Repository<About>){}

  // [ 1 ]  Get About Page 's Data 
  async getAboutData() {
    const about = await this.repo.find()

    if(!about){
      throw new NotFoundException('No Content Found')
    }

    return about;
  }


  
  // [ 2 ]  Create About Page 's Data 
  async createAboutPage(body : CreateAboutDto){
    const about = await this.repo.find()

    if(about.length > 0){
      throw new BadRequestException('About Page Data Already Added !!')
    }

    const createdPage = this.repo.create(body)
    const savedPage = await this.repo.save(createdPage)

    return {
      message : 'About Page \'s Data Is Addedd Successfully',
      data : savedPage
    }
  }




  // [ 3 ]  Update About Page 's Data   
  async updateAboutData (body : UpdateAboutDto){
    const aboutPage = await this.repo.find()

    if(!aboutPage){
      throw new NotFoundException('About Page isn\'t Found !!')
    }

    const aboutID = aboutPage[0]._id
    const about = await this.repo.findOneBy({_id : aboutID})
    
    
    if(!about){
      throw new NotFoundException('About Page isn\'t Found !!')
    } 


    const updated = merge({} , about , body)

    const savedData = await this.repo.save(updated)

    return {
      message : 'About Page Is Updated Successfully',
      data : savedData
    }
  }
}
