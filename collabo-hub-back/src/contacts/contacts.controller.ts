import {
  Controller,
  Get,
  Req,
  UseGuards
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import type { RequestAuth } from '../interfaces/requetsAuth';
import { AuthGuard } from '../guards/auth.guard';
import { ContactsAllMyContactsResponse } from '@collabo-hub/shared'


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

}
