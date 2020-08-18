import {
  UserInfoProps
} from '../store/reducers/modules/user/types';

export function getUserInfo (): Promise<UserInfoProps> {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        id: 0,
        name: 'admin'
      })
    }, 1000)
  })
}