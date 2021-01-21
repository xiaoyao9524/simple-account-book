export interface BaseResult<T> {
    status: number;
    message: string;
    data: T;
}

export interface UserInfo {
    readonly id: number;
    username: string;
    avatar?: string;
}