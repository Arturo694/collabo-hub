import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }]
    ),
    JwtModule,
    MailerModule,
  ],
  controllers: [IamController],
  providers: [IamService],
})
export class IamModule { }
