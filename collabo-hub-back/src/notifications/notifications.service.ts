import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from '../../schemas/notifications.schema';
import { Model } from 'mongoose';
import type { AllMyNotificationsResponse } from '@collabo-hub/shared';

type Notifications = AllMyNotificationsResponse["notifications"]


@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name)
        private readonly notificationModel: Model<NotificationDocument>,
    ) { }

    async allMyNotifications(
        id: string
    ): Promise<Notifications> {
        return await this.notificationModel
            .find({ user: id })
            .select('title message createdAt -_id')
            .sort({ createdAt: -1 })
            .lean()
            .exec();
    }

}
