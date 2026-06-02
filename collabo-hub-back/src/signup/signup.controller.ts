import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import type { CreateUserRequest, CreateUserResponse } from '@collabo-hub/shared';

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

    if (errors.length > 0) return { success: false, messages: errors };

    await this.signupService.createUser(createUserRequest);
    return { success: true, messages: ['User created successfully'] };
  }
}
