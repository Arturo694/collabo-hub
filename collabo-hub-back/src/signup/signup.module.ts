import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema
        }
      ]
    )
  ],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule { }
