import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DemoRequests } from './entities/demo_request.entities';
import { Repository } from 'typeorm';
import { CreateDemoRequestsDto } from './dtos/demo_requests.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class DemoRequestsService {
  constructor(@InjectRepository(DemoRequests) private repo : Repository<DemoRequests>){}

  // [ 1 ] GET all demo requests
  async getAllDemoRequests() {
    const requests = await this.repo.find()

    if(!requests){
      throw new NotFoundException('No Content Found')
    }

    return requests;
  }


  // [ 2 ] Create New Request
  async createDemoRequest(data : CreateDemoRequestsDto){
    const savedData = await this.repo.save(this.repo.create(data))

    return savedData
  }
}
