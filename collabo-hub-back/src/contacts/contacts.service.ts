import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from '../../schemas/contacts.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { ContactsAllMyContactsResponse } from '@collabo-hub/shared';

type ContactArray = ContactsAllMyContactsResponse['contacts'];

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async findAllMyContacts(id: string): Promise<ContactArray> {
    const contacts = await this.contactModel
      .find({
        $or: [{ user: id }, { contact: id }],
      })
      .populate('user', '_id name atSign email')
      .populate('contact', '_id name atSign email')
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
}
