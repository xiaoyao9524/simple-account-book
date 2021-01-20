import { Controller } from 'egg';

class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async register () {
    const {ctx} = this;

    ctx.body = 'hi egg!';
  }
}

export default UserController;
