import { Body, Controller, Get, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientsSectionDto } from './dtos/createClients.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToClass } from 'class-transformer';

@Controller('clients')
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
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
  )
export class ClientsController {

  constructor(private readonly clientsService: ClientsService) {}

  // [ 1 ] GET Clients Section
  @Get()
  async getClients () {
    const clients = await this.clientsService.getClients();
    
    return clients;
  }



  // [ 2 ] POST Clients Section
  @Post()
  async postClients (@Body() body : any , @UploadedFiles() files : Array<Express.Multer.File>) {

    const clientsData = {
      ...body,
      images : files.map((file, index) => ({id : index+1 ,url: `/uploads/${file.filename}`}))
    }

    const newClientsSection = await this.clientsService.postClients(clientsData)
    
    
    return newClientsSection
  }



  // [ 3 ] UPDATE Clients Section
  @Patch()
  async updateClientsSection (@Body() body : any , @UploadedFiles() files : Array<Express.Multer.File>) {

    if(files?.length){
      body.images = files.map((file, index) => ({id : index+1 ,url: `/uploads/${file.filename}`}))
    }

    const cleanBody = Object.assign({}, body);


    const updatedClientSection = await this.clientsService.updateClients(cleanBody)


    return updatedClientSection
  }
}
