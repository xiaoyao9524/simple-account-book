import {
  UserInfoProps
} from '../store/reducers/modules/user/types';

export function getUserInfo (): Promise<UserInfoProps> {
  console.log(222)
  return new Promise((res) => {
    setTimeout(() => {
      console.log(333)
      res({
        id: 0,
        name: 'admin'
      })
    }, 1000)
  })
}