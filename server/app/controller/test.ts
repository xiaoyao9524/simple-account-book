import BaseController from './BaseController';

class TestController extends BaseController {
  async detail() {
    this.success({
      msg: '成功',
    });
  }

  async testValidate() {
    /**
     * {
     *    username: string;
     *    password: string;
     *    confirmPassword: string;
     * }
     */
    const { ctx, app } = this;

    const rule = app.rules.admin.test;

    const validateResult = await ctx.validate(rule, ctx.request.body);

    if (!validateResult) {
      return;
    }

    this.success();
  }
}

export default TestController;
