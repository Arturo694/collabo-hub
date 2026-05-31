import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export enum TeamVisibility {
    Private = 'private',
    Public = 'public',
}


@Schema()
export class Team {
    @Prop({ required: true })
    name: string;

    @Prop({ maxLength: 200, default: "Work in our project" })
    description: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    createdBy: User;

    @Prop({
        type: [{
            type: Types.ObjectId,
            ref: 'User'
        }],
        required: true
    })
    members: User[];

    @Prop({
        type: [String],
        default: [
            "Team",
            "Progress",
            "Challange",
            "Success"
        ]
    })
    tags: string[];

    @Prop({
        default: TeamVisibility.Private,
        enum: TeamVisibility
    })
    visibility: TeamVisibility;

}


export type TeamDocument = HydratedDocument<Team>;
export const TeamSchema = SchemaFactory.createForClass(Team);

// The team has no collaborator limit.
// The creator has full control over the team,
// and each team member will have other
// permissions that the creator does not.
