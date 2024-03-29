import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/admin/register', controller.admin.register);
  router.post('/api/admin/login', controller.admin.login);
  router.post('/api/admin/getUserInfo', controller.admin.getUserInfo);
  router.post('/api/admin/logout', controller.admin.logout);

  // 分类相关
  router.post('/api/category/insert', controller.category.insert);
  router.post('/api/category/getAllCategoryList', controller.category.getAllCategoryList);
  router.post('/api/category/updateCategory', controller.category.updateCategory);
  router.delete('/api/category/deleteCategory', controller.category.deleteCategory);
  router.post('/api/category/getCurrentUserCategory', controller.category.getCurrentUserCategory);
  router.post('/api/category/addCategoryToCurrent', controller.category.addCategoryToCurrent);
  router.post('/api/category/deleteCategoryAndBill', controller.category.deleteCategoryAndBill);


  /** 记账相关 */
  router.post('/api/bill/insertBill', controller.bill.insertBill);
  router.post('/api/bill/getBillListByDate', controller.bill.getBillListByDate);
  router.del('/api/bill/deleteBill', controller.bill.deleteBill);
  router.post('/api/bill/updateBill', controller.bill.updateBill);
  router.post('/api/bill/getBillListByCategoryId', controller.bill.getBillListByCategoryId);
  router.post('/api/bill/checkBillByCategoryId', controller.bill.checkBillByCategoryId);

  /** 特殊controller */
  // router.post('/api/category/insertDefaultCategory', controller.category.insertDefaultCategory);
  router.post('/api/category/getCategoryList', controller.category.getCategoryList);

  /** test controller */
  // router.post('/api/test/detail', controller.test.detail);
  // router.post('/api/test/testSet', controller.test.testSet);
  // router.post('/api/test/testGet', controller.test.testGet);
  // router.post('/api/test/testDel', controller.test.testDel);
  // router.post('/api/test/testValidate', controller.test.testValidate);
  // router.post('/api/test/testDelay', controller.test.testDelay);
};
