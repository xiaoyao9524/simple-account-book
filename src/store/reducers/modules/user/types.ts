export interface UserInfoProps {
  id: number;
  name: string;
}

// actions
export interface SetUserInfoAction {
  type: string;
  userInfo: UserInfoProps;
}
