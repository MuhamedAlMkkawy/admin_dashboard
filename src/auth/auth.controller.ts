import { Body, Controller, Delete, Patch, Post, Session, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/TransformArrays.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SignUpDto } from './dtos/Signup.dto';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { AuthResponce } from './dtos/AuthResponce.dto';
import { LoginDto } from './dtos/Login.dto';
import { ChangePasswordDto } from './dtos/ChangePassword.dto';

@Controller('/')
export class AuthController {
  constructor(private authService : AuthService){}

  // [ 1 ] Signup
  @Post('signup')
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
    MergeFileFieldsInterceptor,
  )
  @Serialize(AuthResponce)
  async signup(@Body() body : SignUpDto , @UploadedFile() file : Express.Multer.File){
    const userData = await this.authService.signup(body)

    return userData;
  }




  // [ 2 ] Login
  @Post('/login')
  @UseInterceptors(FileInterceptor(''))
  @Serialize(AuthResponce)
  async login (@Body() body : LoginDto , @Session() session : any) {
    const user = await this.authService.login(body)

    session.user_token = user.token
    session.role = user.role

    return user;
  }



  // [ 3 ] Logout
  @Delete('/logout')
  async logout(@Session() session : any){
    session.user_token = null 

    return{
      message : 'You have logged out successfully!',
      data : null
    }
  }


  // [ 4 ] Forget Password
  @Patch('/change_password')
  @UseInterceptors(FileInterceptor(''))
  async forgetPassword(@Body() body : ChangePasswordDto , @Session() session : any){
    const user = await this.authService.changePassword(body , session.user_token)

    session.user_token = null
    return user;
  }
}
