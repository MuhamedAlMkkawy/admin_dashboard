import { BadRequestException, Body, Controller, Get, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PortalsService } from './portals.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('portals')
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
export class PortalsController {
  constructor(private portalService : PortalsService) {}

  // [ 1 ] Get Portals Section 
  @Get()
  async getPortalsSection () {
    const portalsSection = await this.portalService.getPortalsData()

    return portalsSection;
  }



  // [ 2 ] Post Portals Section
  @Post()
  async postPortalsSection (@Body() body : any , @UploadedFiles() files : Array<Express.Multer.File>) {
    const portalsSectionData = {
      ...body,
      images : files.map((file, index) => ({id : index+1 ,url: `/uploads/${file.filename}`}))
    }

    if(portalsSectionData.length == 0){
      throw new BadRequestException('Please Fill All the fields!!')
    }

    const portalsData = await this.portalService.postPortalsSection(portalsSectionData)

    return portalsData;
  }



  // [ 3 ] Update Portals Section
  @Patch()
  async updatePortalsSection(@Body() body : any , @UploadedFiles() files : Array<Express.Multer.File>){
    const updatedData = Object.assign({} , body)
    if(files.length > 0){
      updatedData.images = files.map((file, index) => ({id : index+1 ,url: `/uploads/${file.filename}`}))
    }
    
    return await this.portalService.updatePortalsSection(updatedData)
  }
}
