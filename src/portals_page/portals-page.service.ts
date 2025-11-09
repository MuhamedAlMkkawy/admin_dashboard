import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortalsPage } from './entities/PortalsPage.entities';
import { Repository } from 'typeorm';
import { UpdatePortalsPageDto } from './dtos/updatePortalsPageData.dto';
import { merge , cloneDeep } from 'lodash'; 
@Injectable()
export class PortalsPageService {
  constructor(@InjectRepository(PortalsPage) private repo : Repository<PortalsPage>){}

  // [ 1 ] Get Portals Page 's Content
  async getPortalsPageData () {
    const data = await this.repo.find()

    if(!data) {
      throw new NotFoundException('No Content Found!!')
    }

    return data
  }



  // [ 2 ] Create Portals Page 's Content
  async createPortalsPageData (body : any) {
    const portalsPage = await this.repo.find()

    if(portalsPage.length > 0){
      throw new BadRequestException('Portals Page Data is Already Found !!')
    }


    const createdData = await this.repo.save(this.repo.create(body));

    return createdData;

  }



  // [ 3 ] Update Portals Page 's Content
  async updatePortalsPageData(body: UpdatePortalsPageDto) {
    console.log(body)
    // جلب بيانات الصفحة الموجودة (نفترض دائماً عنصر واحد)
    const portalsPage = await this.repo.find();
    if (!portalsPage || portalsPage.length === 0) {
      throw new BadRequestException("Portals Page Data Not Found!!");
    }

    const portalsID = portalsPage[0]._id;

    // جلب البيانات القديمة
    const existingPortals = await this.repo.findOneBy({ _id: portalsID });
    if (!existingPortals) {
      throw new NotFoundException("Portals Page's Data isn't Found!!!");
    }


    // // حفظ البيانات المحدثة
    // const savedData = await this.repo.update(portalsID , body);

    // return {
    //   message: "Portals Page's Data is Updated Successfully..",
    //   data: savedData,
    // };
  }
}

