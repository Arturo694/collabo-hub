import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from '../../schemas/team.schema';
import { Status, StatusDocument, TypeStatus } from '../../schemas/statuses.schema';
import type { TeamsCreateTeamRequest, TeamsCreateTeamResponse } from '@collabo-hub/shared';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) {}

  async createTeam(
    userId: string,
    dto: TeamsCreateTeamRequest,
  ): Promise<TeamsCreateTeamResponse> {
    const team = new this.teamModel({
      name: dto.name,
      description: dto.description,
      tags: dto.tags,
      createdBy: userId,
      members: dto.members,
    });

    const savedTeam = await team.save();

    const statusDocs = dto.statuses.map((s) => ({
      name: s.name,
      description: s.description,
      color: s.color,
      type: s.type === 'priority' ? TypeStatus.PRIORITY : TypeStatus.STATUS,
      team: savedTeam._id,
    }));

    if (statusDocs.length > 0) {
      await this.statusModel.insertMany(statusDocs);
    }

    return { success: true, message: 'Team created successfully' };
  }
}
