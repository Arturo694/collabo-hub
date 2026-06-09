import {
  Controller,
  Get,
  Req,
  UseGuards
} from '@nestjs/common';
import type { RequestAuth } from '../interfaces/requetsAuth';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from '../guards/auth.guard';
import type { AllMyNotificationsResponse } from '@collabo-hub/shared';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService
  ) { }

  @UseGuards(AuthGuard)
  @Get('allMyNotifications')
  async allMyNotifications(
    @Req() request: RequestAuth
  ): Promise<AllMyNotificationsResponse> {
    const { id } = request.tokenData;
    const notifications = await this.notificationsService.allMyNotifications(id);
    return {
      success: true,
      notifications
    }
  }

}
