// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckToken from '../../../app/middleware/checkToken';

declare module 'egg' {
  interface IMiddleware {
    checkToken: typeof ExportCheckToken;
  }
}
