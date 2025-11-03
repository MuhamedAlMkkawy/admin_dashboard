import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pages } from './entities/pages.entities';

@Injectable()
export class PagesService {

  constructor(@InjectRepository(Pages) private repo : Repository<Pages>) {}

  // [ 1 ] Get Pages
  async getPages() {
    const pages = await this.repo.find();

    if(!pages){
      throw new NotFoundException('No Content Found');
    }

    return pages;
  }


  // [ 2 ] Get Page
  // [ 3 ] Create Page
  async createPage(page : string) {
    const isPageExist = await this.repo.findOneBy({name : page});

    if(isPageExist){
      throw new NotFoundException('Page Already Exists');
    }

    const newPage = this.repo.create({name : page});

    if(!newPage){
      throw new NotFoundException('Page Not Created');
    }

    return await this.repo.save(newPage);
  }
  // [ 4 ] Update Page
  // [ 5 ] Delete Page
  
} 
