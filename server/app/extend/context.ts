import { Context } from 'egg';
import { TokenParseProps } from '../types/admin';

export default {
  // 将用户信息加密为token
  encodeToken(
    this: Context,
    { id, username }: TokenParseProps
  ): string {
    const { app } = this;
    const token = app.jwt.sign(`${id}-$${username}`, app.config.jwt.secret, {
      expiresIn: app.config.tokenExpiresSecond,
    });
    return token;
  },
  // 解密token
  decodeToken (this: Context, token: string): TokenParseProps {
    const {app} = this;
    const tokenDecode = app.jwt.verify(token, app.config.jwt.secret);

    const [id, username] = tokenDecode.split('-');

    return {
      id: Number(id),
      username
    }

  }
};
