import { Context } from 'egg';
import { TokenParseProps } from '../types/base';

export default {
  // 将用户信息加密为token
  encodeToken(
    this: Context,
    userInfo: TokenParseProps
  ): string {
    const { app } = this;
    console.log('app.config.tokenExpiresStr: ', app.config.tokenExpiresStr);
    
    const token = app.jwt.sign(userInfo, app.config.jwt.secret, {
      expiresIn: app.config.tokenExpiresStr,
    });
    return token;
  },
  // 解密token
  decodeToken (this: Context): TokenParseProps {
    const {app} = this;

    const token = this.cookies.get('token');

    const tokenParse = app.jwt.verify(token, app.config.jwt.secret);

    return tokenParse;
  }
};
