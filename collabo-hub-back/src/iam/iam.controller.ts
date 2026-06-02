import { Body, Controller, Post } from '@nestjs/common';
import { IamService } from './iam.service';
import type { IamSignUpRequest, IamSignUpResponse } from '@collabo-hub/shared';


@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) { }

  @Post('signup')
  async signup(@Body() iamSignupRequest: IamSignUpRequest): Promise<IamSignUpResponse> {

    const [existEmail, existAtSign] = await Promise.all([
      this.iamService.checkUserByEmail(iamSignupRequest.email),
      this.iamService.checkUserByAtSign(iamSignupRequest.atSign),
    ]);

    const errors = [
      existEmail && 'Email already exists',
      existAtSign && 'At sign already exists',
    ].filter(Boolean) as string[];

    if (errors.length > 0) return { success: false, messages: errors };

    await this.iamService.createUser(iamSignupRequest);
    return { success: true, messages: ['User created successfully'] };
  }
}
