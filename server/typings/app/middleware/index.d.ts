// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckToken from '../../../app/middleware/checkToken';

declare module 'egg' {
  interface IMiddleware {
    checkToken: typeof ExportCheckToken;
  }
}
