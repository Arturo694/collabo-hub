import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Task } from './tasks.schema';

@Schema()
export class Note {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    date: Date;

    @Prop({
        type: Types.ObjectId,
        ref: 'Task',
        required: true
    })
    task: Task;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    user: User;
}

export type NoteDocument = HydratedDocument<Note>;
export const NoteSchema = SchemaFactory.createForClass(Note);
