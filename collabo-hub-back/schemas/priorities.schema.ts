import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Team } from './team.schema';

@Schema()
export class Priority {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    color: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'Team',
        required: true
    })
    team: Team;
}

export type PriorityDocument = HydratedDocument<Priority>;
export const PrioritySchema = SchemaFactory.createForClass(Priority);