import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Priority } from './priorities.schema';
import { Status } from './statuses.schema';
import { Phase } from './phases.schema';

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

    @Prop({ default: false })
    approved: boolean;

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
        ref: 'Priority',
        required: true
    })
    priority: Priority;

    @Prop({
        type: Types.ObjectId,
        ref: 'Status',
        required: true
    })
    status: Status;

    @Prop({
        type: Types.ObjectId,
        ref: 'Phase',
        required: true
    })
    phase: Phase;
}

export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);