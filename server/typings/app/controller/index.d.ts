// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportHome from '../../../app/controller/home';
import ExportTest from '../../../app/controller/test';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    baseController: ExportBaseController;
    home: ExportHome;
    test: ExportTest;
  }
}
