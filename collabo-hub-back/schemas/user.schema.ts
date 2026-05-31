import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true, unique: true })
    email: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true, unique: true })
    atsignal: String;

}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);