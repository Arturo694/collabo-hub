import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class Team {
    @Prop({ required: true })
    name: String;

    @Prop({ default: "Work in our project" })
    description: String;


}


export type TeamDocument = HydratedDocument<Team>;
export const TeamSchema = SchemaFactory.createForClass(Team);
