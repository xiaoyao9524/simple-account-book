import { Controller } from 'egg';
import {
  RegisterParams,
  DetailParams
} from '../types/admin';

class AdminController extends Controller {
  public async register() {
    const { ctx } = this;
    const params: RegisterParams = ctx.request.body;

    console.log('params: ', params);
    
    // const user = await ctx.service.user.
    
    ctx.body = {
      ...params
    };
  }

  async detail () {
    const { ctx } = this;
    const params: DetailParams = ctx.request.body;

    const {id} = params;

    console.log('params: ', params);
    
    const user = await ctx.service.user.getUser({id});
    
    ctx.body = user;
  }

  public login () {

  }
}

export default AdminController;
