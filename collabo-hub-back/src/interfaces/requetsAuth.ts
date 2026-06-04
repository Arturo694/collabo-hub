import { Request } from 'express';

export interface TokenData {
  id: string;
  atSign: string;
}

export interface RequestAuth extends Request {
  tokenData: TokenData;
}
