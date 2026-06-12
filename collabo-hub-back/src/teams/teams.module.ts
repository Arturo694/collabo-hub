import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team, TeamSchema } from '../../schemas/team.schema';
import { Status, StatusSchema } from '../../schemas/statuses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
      { name: Status.name, schema: StatusSchema },
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
