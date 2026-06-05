import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from '../../schemas/contacts.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { Notification, NotificationDocument } from "../../schemas/notifications.schema";
import { ContactsAllMyContactsResponse, ContactsCreateContactResponse } from '@collabo-hub/shared';
import { wrapperNewConnectionEmail } from '@collabo-hub/emails';
import { MailerService } from '@nestjs-modules/mailer';

type ContactArray = ContactsAllMyContactsResponse['contacts'];

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private mailerService: MailerService,
  ) { }

  async findAllMyContacts(id: string): Promise<ContactArray> {
    const contacts = await this.contactModel
      .find({
        $or: [{ user: id }, { contact: id }],
      })
      .populate('user', '_id name atSign email joined')
      .populate('contact', '_id name atSign email joined')
      .exec();

    return contacts.map((c) => {
      const userObj = c.user as User;
      const contactObj = c.contact as User;

      const otherUser =
        (userObj as any)._id.toString() === id ? contactObj : userObj;

      return {
        id: (otherUser as any)._id.toString(),
        name: otherUser.name,
        atSign: otherUser.atSign,
        email: otherUser.email,
        joined: otherUser.joined
      };
    });
  }

  async seekContacts(contact: string): Promise<ContactArray> {
    const users = await this.userModel
      .find({
        $or: [
          { name: { $regex: contact, $options: 'i' } },
          { atSign: { $regex: contact, $options: 'i' } },
        ],
      })
      .select('name atSign email joined')
      .limit(5)
      .lean()
      .exec();

    return users.map((u) => ({
      id: (u as any)._id.toString(),
      name: u.name,
      atSign: u.atSign,
      email: u.email,
      joined: u.joined
    }));
  }

  async createContact(
    myId: string,
    idContact: string,
    emailContact: string
  ): Promise<ContactsCreateContactResponse> {
    const existingContact = await this.contactModel.findOne({
      $or: [
        { user: myId, contact: idContact },
        { user: idContact, contact: myId },
      ],
    });

    if (existingContact)
      return { success: false, message: 'Contact already exists' };


    const contact = new this.contactModel({
      user: myId,
      contact: idContact,
    });

    await contact.save();

    const notification = new this.notificationModel({
      title: "New connection request",
      message: "You got a new connection request on Collabo Hub",
      user: idContact,
    });

    await notification.save();

    await this.mailerService.sendMail({
      to: emailContact,
      subject: 'You got a new connect on Collabo Hub',
      html: await wrapperNewConnectionEmail()
    });

    return { success: true, message: 'Contact created successfully' };
  }
}
