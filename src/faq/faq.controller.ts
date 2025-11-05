import { BadRequestException, Body, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformArrays.interceptor';
import { CreateFaqDto } from './dtos/createFaq.dto';
import { UpdateFaqDto } from './dtos/updateFaq.dto';

@Controller('faq')
@UseInterceptors(TransformFlatToNestedInterceptor)
@UseInterceptors(FileInterceptor(''))
export class FaqController {
  constructor(private faqService : FaqService){}

  // [ 1 ] Get Faq Section 
  @Get()
  async getFaqSection () {
    const faqData = await this.faqService.getFaqSection()

    return faqData;
  }



  // [ 2 ] Create Faq Section 
  @Post()
  async createFaqSection (@Body() body : CreateFaqDto ){
    const createdFaq = await this.faqService.createFaqSection(body)

    return createdFaq
  }
  
  
  // [ 3 ] Update Faq Section 
  @Patch()
  async updateFaqSection(@Body() body : any){
  if (!body.badge && !body.title && (!body.items || body.items.length === 0)) {
    throw new BadRequestException('Body cannot be empty');
  }
  

  return this.faqService.updateFaq(body);
  }
}
