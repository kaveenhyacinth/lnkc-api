import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}

  async signup({ firstName, lastName, email, password }: CreateUserDto) {
    const isAlreadyExist = await this.userService.isExist(email);
    if (isAlreadyExist)
      throw new BadRequestException('email is already in use');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
  }
}