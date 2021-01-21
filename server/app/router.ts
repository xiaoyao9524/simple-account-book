import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/admin/register', controller.admin.register);
  router.post('/api/admin/login', controller.admin.login);
  router.post('/api/admin/detail', controller.admin.detail);

};
