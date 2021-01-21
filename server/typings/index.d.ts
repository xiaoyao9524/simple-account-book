import 'egg';
import { TokenParseProps } from '../app/types/admin';

declare module 'egg' {
  interface Application {
    jwt: any;
    // Sequelize: any;
  }
}