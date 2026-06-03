import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IamService } from './iam.service';
import type {
  IamSignUpRequest,
  IamSignUpResponse,
  IamSignInRequest
} from '@collabo-hub/shared';
import { wrapperWelcomeEmail } from '@collabo-hub/emails'


@Controller('iam')
export class IamController {
  constructor(
    private readonly iamService: IamService,
    private readonly mailerService: MailerService
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
    await this.mailerService.sendMail({
      to: iamSignupRequest.email,
      subject: 'Welcome to Collabo Hub',
      html: await wrapperWelcomeEmail({
        username: iamSignupRequest.name,
        atSign: iamSignupRequest.atSign,
      }),
    })

    return { success: true, messages: ['User created successfully'] };
  }

  @Post('signin')
  async signin(
    @Body() iamSignInRequest: IamSignInRequest
  ) {

  }
}
