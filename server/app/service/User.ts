import { Service } from 'egg';

class UserService extends Service {
  public async getUser(id: number) {
    const {ctx} = this;

    try {
      const result = await ctx.model.User.findOne({
        where: {
          id
        }
      })

      return result;
    } catch (err) {
      console.log('err: ', err);
    }
  }


}

export default UserService;
