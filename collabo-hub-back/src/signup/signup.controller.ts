import { Body, Controller, Post, ConflictException } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateUserRequest } from './dto/request';
import { CreateUserResponse } from './dto/response';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) { }

  @Post('createUser')
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {

    const [existEmail, existAtSign] = await Promise.all([
      this.signupService.checkUserByEmail(createUserRequest.email),
      this.signupService.checkUserByAtSign(createUserRequest.atSign),
    ]);

    const errors = [
      existEmail && 'Email already exists',
      existAtSign && 'At sign already exists',
    ].filter(Boolean) as string[];

    if (errors.length > 0) return { success: false, errors };

    await this.signupService.createUser(createUserRequest);
    return { success: true, errors: [] };
  }
}
