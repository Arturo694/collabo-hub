import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from '../../schemas/contacts.schema';
import { ContactsAllMyContactsResponse } from '@collabo-hub/shared';


@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>
  ) { }

  async findAllMyContacts(
    id: string
  ): Promise<ContactsAllMyContactsResponse["contacts"]> {
    const contacts = await this.contactModel
      .find({
        or: [{ user: id }, { contact: id }],
      })
      .populate('user', '_id name atSign email')
      .populate('contact', '_id name atSign email')
      .exec();

    return contacts.map((c) => {
      const otherUser =
        (c.user as any)._id.toString() === id ? c.contact : c.user;
      return {
        id: (otherUser as any)._id.toString(),
        name: otherUser.name,
        atSign: otherUser.atSign,
        email: otherUser.email,
        joined: otherUser.joined
      };
    });
  }
}
