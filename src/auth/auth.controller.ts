import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/user/user.interface';
import CreateUserDto from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './user.interceptor';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Adminuser } from 'src/adminuser/adminuser.interface';
import CreateAdminuserDto from 'src/adminuser/dto/create-adminuser.dto';
import { LoginAdAuthDto } from './dto/loginA-auth.dto';
import { Supadmin } from 'src/supadmin/supadmin.interface';
import CreateSupadminDto from 'src/supadmin/dto/create-supadmin.dto';
import { LoginSupadminAuthDto } from './dto/loginSupAdmin-auth.dto';
/*import { CurrentUserInterceptor } from './user.interceptor';*/

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('mesup')
  async mesup(@Request() req): Promise<Supadmin | undefined> {
    console.log(req.user);
    return this.authService.getMes(req.user);
  }

  @Get('me')
  async me(@Request() req): Promise<User | undefined> {
    console.log(req.user);
    return this.authService.getMe(req.user);
  }

  @Get('mea')
  async mea(@Request() req): Promise<Adminuser | undefined> {
    console.log(req.user);
    return this.authService.getMea(req.user);
  }

  @Post('registersup')
  async registersup(@Body() newSupadmin: CreateSupadminDto): Promise<Supadmin> {
    return this.authService.registersup(newSupadmin);
  }

  @Post('register')
  async register(@Body() newUser: CreateUserDto): Promise<User> {
    return this.authService.register(newUser);
  }

  @Post('registera')
  async registera(
    @Body() newAdminuser: CreateAdminuserDto,
  ): Promise<Adminuser> {
    return this.authService.registera(newAdminuser);
  }

  @Post('loginsup')
  async loginsup(@Body() loginDto: LoginSupadminAuthDto) {
    return this.authService.loginsup(loginDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('logina')
  async logina(@Body() loginADto: LoginAdAuthDto) {
    return this.authService.logina(loginADto);
  }
}
