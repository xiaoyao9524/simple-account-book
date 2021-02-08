import { Context } from 'egg';
import { TokenParseProps } from '../types/base';

export default {
  // 将用户信息加密为token
  encodeToken(this: Context, userInfo: TokenParseProps): string {
    const { app } = this;

    const token = app.jwt.sign(userInfo, app.config.jwt.secret, {
      expiresIn: app.config.tokenExpiresStr,
    });
    return token;
  },
  // 解密token
  decodeToken(this: Context): TokenParseProps {
    const { app } = this;
    console.log('4443444: ', 4443444);
    
    const cookieToken = this.cookies.get('token');
    console.log('cookieToken: ', cookieToken);
    
    const headersToken = this.request.headers['token'];
    console.log('headersToken: ', headersToken);
    
    const token = cookieToken || headersToken;
    console.log('token-333: ', token);
    
    const tokenParse = app.jwt.verify(token, app.config.jwt.secret);

    return tokenParse;
  },
};
