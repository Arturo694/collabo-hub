import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Team } from './team.schema';

@Schema()
export class Phase {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true })
    order: number;

    @Prop({
        type: Types.ObjectId,
        ref: 'Team',
        required: true
    })
    team: Team;
}

export type PhaseDocument = HydratedDocument<Phase>;
export const PhaseSchema = SchemaFactory.createForClass(Phase);