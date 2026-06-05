import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Contact {

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    user: User | string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    contact: User | string;

    @Prop({ default: Date.now })
    createdAt: Date;

}

export type ContactDocument = HydratedDocument<Contact>;
export const ContactSchema = SchemaFactory.createForClass(Contact);

// Contacts are created when one of the two parties
// accepts the invitation. This ensures that whoever
// creates or belongs to a team can only add their
// own contacts, preventing uncontrolled invitations to
// strangers.