import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express'
import { IamService } from './iam.service';
import type {
  IamSignUpRequest,
  IamSignUpResponse,
  IamSignInRequest,
  IamSignInResponse
} from '@collabo-hub/shared';


@Controller('iam')
export class IamController {
  constructor(
    private readonly iamService: IamService,
  ) { }

  @Post('signup')
  async signup(
    @Body() iamSignupRequest: IamSignUpRequest
  ): Promise<IamSignUpResponse> {

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

  @Post('signin')
  async signin(
    @Body() iamSignInRequest: IamSignInRequest,
    @Res({ passthrough: true }) response: Response
  ): Promise<IamSignInResponse> {

    const token = await this.iamService.generateTokenSignIn(iamSignInRequest);
    if (!token) return { success: false, message: 'Invalid credentials' };

    response.cookie(
      'token', token,
      {
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      }
    )

    return { success: true, message: 'User signed in successfully' };
  }
}
