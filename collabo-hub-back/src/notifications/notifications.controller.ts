import { Controller, Get, Req } from '@nestjs/common';
import type { RequestAuth } from '../interfaces/requetsAuth';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService
  ) { }

  @Get('allMyNotifications')
  async allMyNotifications(@Req() request: RequestAuth) {
    const { id } = request.tokenData;
    const allMyNotifications = await this.notificationsService.allMyNotifications(id);
    console.log(allMyNotifications);

  }

}
