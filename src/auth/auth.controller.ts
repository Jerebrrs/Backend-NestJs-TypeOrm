import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/auth.entity';
import { RawHeaders, GetUser, RoleProtected, Auth } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRole } from './interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('verify-token')
  @Auth()
  checkAuth(@GetUser() user: User) {
    return this.authService.checkUser(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  privateRouter(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    console.log(request);

    return {
      status: true,
      message: 'Hola mundo privado...',
      user,
      userEmail,
      rawHeaders,
    };
  }

  @Get('privadisimo')
  @UseGuards(AuthGuard(), UserRoleGuard) //no lleva parantesis porq viene de la instancia de nest
  @RoleProtected(ValidRole.admin)
  miPrivate(@GetUser() user: User) {
    return {
      ok: ' Ya no es privada',
      user,
    };
  }

  @Get('privadisimo2')
  @Auth()
  miPrivateDos(@GetUser() user: User) {
    return {
      ok: ' Ya no es privada',
      user,
    };
  }
}
