import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { TeamsService } from './teams.service';
import type { RequestAuth } from '../interfaces/requetsAuth';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService
  ) { }


  @UseGuards(AuthGuard)
  @Post('createTeam')
  async createTeam(
    @Req() request: RequestAuth,
    // @Body() body: CreateTeamDto
  ) {
    const { id } = request.tokenData;
  }
}
