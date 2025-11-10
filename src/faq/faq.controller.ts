import { BadRequestException, Body, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';
import { CreateFaqDto } from './dtos/createFaq.dto';

@Controller('faq')
@UseInterceptors(
  FileInterceptor('') ,
  TransformFlatToNestedInterceptor
)
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
  async createFaqSection (@Body() body : any ){
    const data = {
      ...body,
      items : body.items.map((item , index) => ({id : index+1 , ...item}))
    }

    const createdFaq = await this.faqService.createFaqSection(data)

    return createdFaq
  }
  
  
  // [ 3 ] Update Faq Section 
  @Patch()
  async updateFaqSection(@Body() body : any){
    if (!body) {
      throw new BadRequestException('You should add data to continue');
    }
    
    return this.faqService.updateFaq(body);
  }
}
