import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }]
    )
  ],
  controllers: [IamController],
  providers: [IamService],
})
export class IamModule { }
