export interface BaseSuccessResult<T> {
    status: 200;
    message: string;
    data: T;
}

/**
 * 500： 请求不合法
 * 1001：未携带token
 * 1002： token已失效
 */
type failResultStatus = 500 | 1001 | 1002;

export interface BaseFailResult {
    status: failResultStatus;
    message: string;
}

export type BaseResult<T> = BaseSuccessResult<T> | BaseFailResult;
