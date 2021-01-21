import {IHelper} from 'egg';
import {TokenParseProps} from '../types/admin';

export default {
  tokenParse (this: IHelper) {
    const tokenStr = this.ctx.request.header.token;

    const tokenParse: TokenParseProps = this.app.jwt.verify(tokenStr, this.app.config.jwt.secret);
    
    return tokenParse;
  }
}