import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  Post,
  Body,
  Delete
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import type { RequestAuth } from '../interfaces/requetsAuth';
import { AuthGuard } from '../guards/auth.guard';
import type {
  ContactsAllMyContactsResponse,
  ContactsCreateContactRequest,
  ContactsCreateContactResponse
} from '@collabo-hub/shared'


@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService
  ) { }


  @UseGuards(AuthGuard)
  @Get('allMyContacts')
  async allMyContacts(
    @Req() request: RequestAuth
  ): Promise<ContactsAllMyContactsResponse> {
    const { id } = request.tokenData;
    const contacts = await this.contactsService.findAllMyContacts(id);

    return { success: true, contacts, };
  }

  @UseGuards(AuthGuard)
  @Get('searchContacts/:contact')
  async searchContacts(
    @Param('contact') contact: string
  ): Promise<ContactsAllMyContactsResponse> {
    const contacts = await this.contactsService.seekContacts(contact);
    return { success: true, contacts, };
  }

  @UseGuards(AuthGuard)
  @Post('createContact')
  async createContact(
    @Body() createContactRequest: ContactsCreateContactRequest,
    @Req() request: RequestAuth
  ): Promise<ContactsCreateContactResponse> {
    const { idContact, email } = createContactRequest;
    const { id } = request.tokenData;

    return this.contactsService.createContact(id, idContact, email)
  }

  @UseGuards(AuthGuard)
  @Delete("deleteContact/:idContact")
  async deleteContact(
    @Param('idContact') idContact: string,
    @Req() request: RequestAuth
  ) {
    const { id } = request.tokenData;
  }

}
