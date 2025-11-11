import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModulesPage } from './entities/modulesPage.entitites';
import { Repository } from 'typeorm';
import { CreateModulesPageDto } from './dtos/craeteModulesPage.dto';
import { UpdateModulesPageDto } from './dtos/updateModulesPage.dto';
import {merge} from 'lodash'
@Injectable()
export class ModulesPageService {
  constructor(@InjectRepository(ModulesPage) private repo : Repository<ModulesPage>) {}

  // [ 1 ] GET the modules page data
  async getModulesPage(){
    const modulesPage = await this.repo.find()

    if(!modulesPage.length){
      throw new NotFoundException('No Content Found')
    }

    return modulesPage
  }



  // [ 2 ] Create the modules page data
  async createModulesPageData(body : CreateModulesPageDto){
    const modulesPage = await this.repo.find()

    if(modulesPage.length > 0){
      throw new BadRequestException('Modules Page Data is Already Found !!')
    }

    const createdPage = this.repo.create(body)
    const savedPage = await this.repo.save(createdPage)

    return {
      message : 'Modules Page Data Is Added Successfully',
      data : savedPage
    }
  }




  // [ 3 ] Update the modules page data
  async updateModulesPageData(body : UpdateModulesPageDto){
    const modulesPage = await this.repo.find()  

    if(!modulesPage.length){
      throw new NotFoundException('Modules Page Data isn\'t Found !!')
    }

    const updatedData = merge({} , modulesPage[0] , body)
    const updated = await this.repo.save(updatedData)

    return updated
  }
}
