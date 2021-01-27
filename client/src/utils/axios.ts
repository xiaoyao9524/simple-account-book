import axios, {AxiosRequestConfig, AxiosPromise, AxiosResponse} from 'axios'

const service = axios.create({
  timeout: 60 * 1000 // 请求超时时间
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response;
  }
)

function request<T>(config: AxiosRequestConfig):AxiosPromise<T>  {
  return service(config);
}

export default request
