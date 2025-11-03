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
  async updatePage (id : string , name : string) {
    const updatedPage = await this.repo.findOneBy({ _id: new (require('mongodb').ObjectId)(id) });

    if(!updatedPage){
      throw new NotFoundException('Page Not Found')
    }

    await this.repo.update({_id: new (require('mongodb')).ObjectId(id)}, {name : name});


    const newPage = await this.repo.findOneBy({ _id: new (require('mongodb').ObjectId)(id) });


    return {
      message : 'Page Is Updated Successfully',
      data : newPage
    };
  }



  // [ 5 ] Delete Page
  async deletePage(id : string){
    const page = await this.repo.findOneBy({_id : new (require('mongodb').ObjectId)(id)})


    if(!page){
      throw new NotFoundException('Page Not Found')
    }

    await this.repo.delete(page);


    return {
      message : 'Page is Deleted SuccessFully!',
      data : null
    }
  }
} 
