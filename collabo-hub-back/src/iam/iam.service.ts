import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import type { IamSignUpRequest, IamSignInRequest } from '@collabo-hub/shared';
import { wrapperWelcomeEmail } from '@collabo-hub/emails';
import bcrypt from 'bcrypt';

@Injectable()
export class IamService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) { }

    async checkUserByEmail(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email }).exec();
        return user ? true : false;
    }

    async checkUserByAtSign(atSign: string): Promise<boolean> {
        const user = await this.userModel.findOne({ atSign }).exec();
        return user ? true : false;
    }

    async createUser(
        iamSignupRequest: IamSignUpRequest
    ): Promise<UserDocument> {
        const user = await new this.userModel(iamSignupRequest).save();

        await this.mailerService.sendMail({
            to: iamSignupRequest.email,
            subject: 'Welcome to Collabo Hub',
            html: await wrapperWelcomeEmail({
                username: iamSignupRequest.name,
                atSign: iamSignupRequest.atSign,
            }),
        });

        return user;
    }

    async generateTokenSignIn(
        iamSignInRequest: IamSignInRequest
    ): Promise<string | null> {
        const user = await this.userModel.findOne({
            email: iamSignInRequest.email
        }).exec();

        if (!user) return null;

        const isValidPassword = await bcrypt.compare(
            iamSignInRequest.password,
            user.password
        );

        if (!isValidPassword) return null;

        const payload = {
            atSign: user.atSign,
            id: user._id.toString(),
        }

        return await this.jwtService.signAsync(payload);
    }

    async getUserName(id: string): Promise<string | null> {
        const user = await this.userModel.findById(id).select('name').lean().exec();
        return user ? user.name : null;
    }
}
