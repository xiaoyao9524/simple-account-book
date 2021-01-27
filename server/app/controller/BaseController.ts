import { Controller } from 'egg';
import {BaseResponse} from '../types/base';

class BaseController extends Controller {
  success <T> (data?: T | undefined, message?: string) {
    const {ctx} = this;

    const body: BaseResponse<T | undefined> = {
      status: 200,
      message: message || 'success',
      data: data || undefined
    }
    ctx.status = 200;
    ctx.statusText = message || 'success';
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
