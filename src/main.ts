import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import * as express from 'express';
import { join } from 'path';
import { AuthGuard } from './guards/auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';


const cookieSession = require('cookie-session')



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      transform : true , 
      whitelist: true ,
      forbidNonWhitelisted: true
    }
  ));

  // TO MAKE TIMEOUT FOR THE SERVER REQUEST
  app.useGlobalInterceptors(new TimeoutInterceptor());

    // 👇 Interceptor لتوحيد رسائل النجاح
  app.useGlobalInterceptors(new ResponseInterceptor());

  // console.log('✅ ENV MONGODB_URI:', process.env.MONGO_URL);


  // TO MAKE THE APP USE THE COOKIE SESSIONS
  app.use(cookieSession({
    keys : ['user_token']
  }));

  app.useGlobalGuards(new AuthGuard() , new PermissionsGuard())

  // 👇 Filter لتوحيد رسائل الخطأ
  // app.useGlobalFilters(new AllExceptionsFilter());

  // Serve uploaded files
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
