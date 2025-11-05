import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entities';
import { Repository } from 'typeorm';
import { CreateFaqDto } from './dtos/createFaq.dto';
import { UpdateFaqDto } from './dtos/updateFaq.dto';

@Injectable()
export class FaqService {
  constructor(@InjectRepository(Faq) private repo : Repository<Faq>){}

  // [ 1 ] Get Faq Section 
  async getFaqSection () {
    const faqData = await this.repo.find()

    if(!faqData){
      throw new NotFoundException('No Content Found!!')
    }

    return faqData;
  }



  // [ 2 ] Create Faq Section 
  async createFaqSection(body : CreateFaqDto) {
    const faqSection = await this.repo.find()

    if(faqSection.length > 0){
      throw new NotFoundException('Faq Section is Added Already!')
    }


    const addedFaq = await this.repo.save(this.repo.create(body))

    return addedFaq;
  }
  
  
  // [ 3 ] Update Faq Section 
  async updateFaq(data : UpdateFaqDto){
    const faqSection = await this.repo.find()

    if(!faqSection){
      throw new NotFoundException('Faq Section isn\'t Found')
    }

    const faqSectionID = faqSection[0]._id

    await this.repo.update({_id : faqSectionID} , data)

    return{
      message : 'Faq Section Updated Successfully!',
      data : await this.repo.findOneBy({_id : faqSectionID})
    }
  }
}
