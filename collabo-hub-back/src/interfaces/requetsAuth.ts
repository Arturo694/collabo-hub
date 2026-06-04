import { Request } from 'express';

export interface TokenData {
  id: string;
  email: string;
}

export interface RequestAuth extends Request {
  tokenData: TokenData;
}
