import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import type { IamSignUpRequest } from '@collabo-hub/shared';

@Injectable()
export class IamService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async checkUserByEmail(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email }).exec();
        return user ? true : false;
    }

    async checkUserByAtSign(atSign: string): Promise<boolean> {
        const user = await this.userModel.findOne({ atSign }).exec();
        return user ? true : false;
    }

    async createUser(iamSignupRequest: IamSignUpRequest): Promise<UserDocument> {
        const user = new this.userModel(iamSignupRequest);
        return user.save();
    }
}
