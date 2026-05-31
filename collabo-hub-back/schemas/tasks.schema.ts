import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Task {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({
        type: [{
            type: Types.ObjectId,
            ref: 'User'
        }],
        required: true
    })
    whoAssignedTo: User[];

    @Prop({
        type: Types.ObjectId,
        ref: 'Phase',
        required: true
    })
    phase: Types.ObjectId;
}

export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);