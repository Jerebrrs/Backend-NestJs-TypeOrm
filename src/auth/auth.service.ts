import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interface/jwt-interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;

    try {
      const user = await this.usersRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      });

      await this.usersRepository.save(user);
      const { password: _, ...userData } = user;

      return {
        ...userData,
        token: this.jwtToken({ id: userData.id }),
      };
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user)
      throw new UnauthorizedException('Credential are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credential are not valid (Password)');

    return {
      email,
      token: this.jwtToken({ id: user.id }),
    };
  }

  private jwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleError(error: any): never {
    //never es
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Pleace Cheks server errors.');
  }
}
