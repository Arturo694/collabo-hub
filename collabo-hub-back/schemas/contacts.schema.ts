import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


@Schema()
export class Contact {

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    user: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    contact: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;

}

export type ContactDocument = HydratedDocument<Contact>;
export const ContactSchema = SchemaFactory.createForClass(Contact);