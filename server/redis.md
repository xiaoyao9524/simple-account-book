# Redis相关字段说明

## 一、token
|key|value|说明|
|:--:|:--:|:--:|
|`user_${username}_token`|token|过期时间一天，重复登录会将新的token替换掉旧的token，每次请求会拿请求token与redis中的token对比，一致才可通过认证|