import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact, ContactSchema } from '../../schemas/contacts.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { Notification, NotificationSchema } from '../../schemas/notifications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema }
    ])
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule { }
