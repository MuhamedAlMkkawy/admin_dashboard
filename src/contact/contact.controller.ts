import { BadRequestException, Body, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformFlatToNested.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';

@Controller('/contact')
export class ContactController {
  constructor (private contactService : ContactService) {}

  // [ 1 ] GET the contact page data
  @Get()
  async getContactData () {
    const data = await this.contactService.getContactPage()

    return data
  }



  // [ 2 ] Create the contact page data
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
    TransformFlatToNestedInterceptor,
    MergeFileFieldsInterceptor
  )
  async createContactPage(@Body() body : any) {
    const data = {
      ...body,
      contacts: {
        ...body.contacts,
        contacts_info: body.contacts.contacts_info.map((item, index) => ({
          id: index + 1,
          ...item,
        })),
      },
    };

    const contactPage = await this.contactService.createContactPage(data)

    return contactPage
  }



  // [ 3 ] Update the contact page data
  @Patch()
    @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
    TransformFlatToNestedInterceptor,
    MergeFileFieldsInterceptor
  )
  async updateContactPage(@Body() body : any) {
    if(!body) {
      throw new BadRequestException('You Must Add Data to Continue...');
    }

    const data = {
      ...body,
      contacts: body.contacts
        ? {
            ...body.contacts,
            contacts_info: body.contacts.contacts_info?.map((info, index) => ({
              id: index + 1,
              ...info,
            })),
          }
        : undefined,
      info: body.info
        ? {
            ...body.info,
            buttons: body.info.buttons?.map((button, index) => ({
              id: index + 1,
              ...button,
            })),
          }
        : undefined,
    };

    const contact = await this.contactService.updateContactPage(data)


    return contact
  }
}
