import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact, ContactSchema } from '../../schemas/contacts.schema'
import { User, UserSchema } from '../../schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: User.name, schema: UserSchema }])
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule { }
