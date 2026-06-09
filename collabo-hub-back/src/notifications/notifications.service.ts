import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from '../../schemas/notifications.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name)
        private readonly notificationModel: Model<NotificationDocument>,
    ) { }

    async allMyNotifications(id: string) {
        return this.notificationModel
            .find({ user: id })
            .sort({ createdAt: -1 })
            .exec();
    }

}
