// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBill from '../../../app/model/bill';
import ExportCategory from '../../../app/model/category';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Bill: ReturnType<typeof ExportBill>;
    Category: ReturnType<typeof ExportCategory>;
    User: ReturnType<typeof ExportUser>;
  }
}
