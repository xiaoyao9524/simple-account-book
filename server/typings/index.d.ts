import 'egg';
import { SignOptions, SignCallback, VerifyOptions, VerifyCallback } from 'jsonwebtoken';
import {TokenParseProps} from './app/types/admin';

declare module 'egg' {
  interface Application {
    jwt: {
      sign(
        payload: string | Buffer | object,
        secretOrPrivateKey: string,
        options?: SignOptions,
        callback?: SignCallback
      ): string;
      verify(token: string, secretOrPrivateKey: string, options?: VerifyOptions, callback?: VerifyCallback): TokenParseProps;
      decode(token: string): string;
    }
  }
}