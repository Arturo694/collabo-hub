import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Team } from './team.schema';

export enum TypeStatus {
    STATUS = 'status',
    PRIORITY = 'priority',
}

@Schema()
export class Status {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    color: string;

    @Prop({
        type: String,
        enum: TypeStatus,
        required: true
    })
    type: TypeStatus;

    @Prop({
        type: Types.ObjectId,
        ref: 'Team',
        required: true
    })
    team: Team | string;
}

export type StatusDocument = HydratedDocument<Status>;
export const StatusSchema = SchemaFactory.createForClass(Status);
