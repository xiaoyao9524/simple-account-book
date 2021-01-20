import { Service } from 'egg';

interface queryUserParams {
  id?: number;
  username?: string;
}

class UserService extends Service {
  public async getUser(params: queryUserParams) {
    const {ctx} = this;

    const {id, username} = params;

    const where: queryUserParams = {};

    if (id !== undefined) {
      where.id = id;
    } else if (username !== undefined) {
      where.username = username;
    }

    try {
      const result = await ctx.model.User.findOne({
        where
      })

      return result;
    } catch (err) {
      console.log('err: ', err);
    }
  }


}

export default UserService;
