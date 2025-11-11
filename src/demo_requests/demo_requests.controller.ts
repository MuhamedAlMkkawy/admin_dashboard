import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { DemoRequestsService } from './demo_requests.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';
import { CreateDemoRequestsDto } from './dtos/demo_requests.dto';

@Controller('demo_requests')
export class DemoRequestsController {
  constructor(private demoRequestsService : DemoRequestsService){}

  // [ 1 ] Get all demo requests
  @Get()
  async getAllDemoRequests() {
    const data = await this.demoRequestsService.getAllDemoRequests()

    return data
  }


  // [ 2 ] Create New Demo Request
  @Post()
  @UseInterceptors(
    FileInterceptor(''),
    TransformFlatToNestedInterceptor
  )
  async createDemoRequest (@Body() body : CreateDemoRequestsDto) {
    const data = await this.demoRequestsService.createDemoRequest(body)

    return data
  }
}
