import { BadRequestException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entities';
import { Repository } from 'typeorm';
import { SignUpDto } from './dtos/Signup.dto';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/Login.dto';
import { ChangePasswordDto } from './dtos/ChangePassword.dto';

const scrypt = promisify(crypto.scrypt);


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) 
    private repo : Repository<Users> ,
    private jwtService : JwtService
  ){}

  // [ 1 ] Signup
  async signup (body : SignUpDto){
    // [ 1 ] Check if the user is found 
    const users = await this.repo.find();

    const existingUser = users.find(user => user.email === body.email);
    if (existingUser) {
      throw new BadRequestException('User Already Exists');
    }
    
    const userEmail = body.email

    // [ 2 ] If the user is not Signed Up Before
      // ( 1 ) create salt
      const salt = randomBytes(32).toString('hex')
      // ( 2 ) create salt
      const hash  = (await scrypt(body.password , salt , 32)) as Buffer;
      // ( 3 ) encrypt the password
      const hashedPassword = salt + '.' + hash.toString('hex');
      // ( 4 ) Generate the token
      const generetedToken =  this.jwtService.sign({userEmail})
      // ( 5 ) save the user 's data
      const userData = {
        ...body ,
        token : generetedToken ,
        password : hashedPassword
      }

      const savedUser = this.repo.create(userData)

    return await this.repo.save(savedUser);
  }



  // [ 2 ] Login
  async login(body : LoginDto){
    const users = await this.repo.find()

    const existingUser = users.find((user) => user.email == body.email)

    if(!existingUser){
      throw new NotFoundException('You Don\'t Have an Account');
    }

    const [ salt , hashedPassword ] = existingUser.password.split('.');
    
    const hash = (await scrypt(body.password , salt , 32)) as Buffer;

    if(hash.toString('hex') !== hashedPassword){
      throw new BadRequestException('Email / Password is\'nt Correct');
    }
    
    return existingUser
  }



  // [ 3 ] Change Password
  async changePassword(body : ChangePasswordDto , token : string) {
    const user = await this.repo.findOneBy({token : token})

    if(!user){
      throw new BadRequestException('Please Logging before retry')
    }

    const [ salt , hashedPassword ] = user.password.split('.');

    const hash = (await scrypt(body.current_password , salt , 32)) as Buffer;
    

    if(hash.toString('hex') !== hashedPassword) {
      throw new BadRequestException('Current Password is not correct')
    }

    if(body.new_password !== body.confirm_password){
      throw new BadRequestException('New Password and Confirm Password don\'t match')
    } 
    
    const newSalt = randomBytes(8).toString('hex');
    const newHash = (await scrypt(body.new_password , salt , 32)) as Buffer;
    const newPasswordHased = newSalt + '.' + newHash.toString('hex');

    const userData = {
      ...user ,
      password  : newPasswordHased
    }

    await this.repo.update(user._id, userData);

    return {
      message : 'Password Updated Successfully , Login agin to continue',
      data : null
    }
  }
}
