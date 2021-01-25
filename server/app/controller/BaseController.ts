import {Controller} from 'egg';
import {BaseResponse} from '../types/base';

class BaseController extends Controller {
  succcess <T> (data: T, message?: string) {
    const {ctx} = this;

    const body: BaseResponse<T> = {
      status: 200,
      message: message || 'success',
      data
    }
    ctx.body = body;
  }

  error(message: string, status: number = 500) {
    const {ctx} = this;
    ctx.body = {
      status,
      message
    }
  }
}

export default BaseController;
