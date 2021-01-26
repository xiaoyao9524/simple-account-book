import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/admin/register', controller.admin.register);
  router.post('/api/admin/login', controller.admin.login);

  /** test controller */
  router.post('/api/test/detail', controller.test.detail);
  router.post('/api/test/testSet', controller.test.testSet);
  router.post('/api/test/testGet', controller.test.testGet);
  router.post('/api/test/testDel', controller.test.testDel);
  router.post('/api/test/testValidate', controller.test.testValidate);
};
