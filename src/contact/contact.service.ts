import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entitites/contact.entities';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/createContact.dto';
import { UpdateContactDto } from './dto/updateContact.dto';
import {merge} from 'lodash'
@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private repo : Repository<Contact>) {}

  // [ 1 ] GET the contact page data
  async getContactPage () {
    const data = await this.repo.find()

    if(!data){
      throw new NotFoundException('No Content Found!!')
    }

    return data
  }



  // [ 2 ] Create the contact page data
  async createContactPage (body : CreateContactDto){
    const contactPage = await this.repo.find()

    if(contactPage.length > 0){
      throw new BadRequestException('Contact Page Data is Already Found !!')
    }

    const createdPage = this.repo.create(body)
    const savedPage = await this.repo.save(createdPage)

    return savedPage
  }



  // [ 3 ] Update the contact page data
  async updateContactPage(body : UpdateContactDto){
    const contactPage = await this.repo.find()

    if(!contactPage.length){
      throw new NotFoundException('Contact Page Data isn\'t Found !!')
    }

    const updatedData = merge({} , contactPage[0] , body)
    const updated = await this.repo.save(updatedData)

    return updated
  }
}
