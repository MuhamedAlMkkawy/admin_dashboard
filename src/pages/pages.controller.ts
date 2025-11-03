import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  UseInterceptors 
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseInterceptors(FileInterceptor(''))
@Controller('pages')
export class PagesController {
  constructor(private pagesService : PagesService) {}

  // [ 1 ] Get Pages
  @Get()
  async getPages() {
    const pages = await this.pagesService.getPages();

    return pages;
  }



  // [ 2 ] Get Page
  // [ 3 ] Create Page
  @Post()
  async createPage(@Body('name') body: string) {
    const createdPage = await this.pagesService.createPage(body);

    return createdPage;
  }



  // [ 4 ] Update Page
  @Patch('/:id')
  async updatePage(@Param('id') id : string , @Body('name') name : string) {
    const updatedPage = await this.pagesService.updatePage(id , name);

    return updatedPage;
  }




  // [ 5 ] Delete Page
  @Delete('/:id')
  async deletePage(@Param('id') id : string){
    const page = await this.pagesService.deletePage(id)
    console.log(page)
    return page;
  }
}
