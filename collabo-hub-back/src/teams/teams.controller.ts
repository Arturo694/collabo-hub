import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { TeamsService } from './teams.service';
import type { RequestAuth } from '../interfaces/requetsAuth';
import type {
  TeamsCreateTeamRequest,
  TeamsCreateTeamResponse,
  TeamsMyTeamsResponse,
} from '@collabo-hub/shared';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService
  ) { }

  @UseGuards(AuthGuard)
  @Get('myTeams')
  async myTeams(
    @Req() request: RequestAuth
  ): Promise<TeamsMyTeamsResponse> {
    const { id } = request.tokenData;
    return this.teamsService.findMyTeams(id);
  }

  @UseGuards(AuthGuard)
  @Post('createTeam')
  async createTeam(
    @Req() request: RequestAuth,
    @Body() body: TeamsCreateTeamRequest
  ): Promise<TeamsCreateTeamResponse> {
    const { id } = request.tokenData;
    return this.teamsService.createTeam(id, body);
  }
}
