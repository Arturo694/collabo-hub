import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Notification {

    @Prop({
        type: String,
        required: true
    })
    title: string;

    @Prop({
        type: String,
        required: true
    })
    message: string;

    @Prop({
        type: Date,
        default: Date.now
    })
    createdAt: Date;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    user: User | string;

}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);