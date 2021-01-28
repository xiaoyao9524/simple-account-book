import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';
import { createBrowserHistory } from 'history';

const service = axios.create({
  timeout: 60 * 1000 // 请求超时时间
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log('response.data.status: ', response.data.status);
    const location = createBrowserHistory();
    console.log('location: ', location);
    
    console.log('response.status: ', response.status);
    console.log('location.location.pathname: ', location.location.pathname);
    
    switch (response.data.status) {
      case 1001: 
      case 1002:
        window.location.href = `/login?redirect=${location.location.pathname}&failMsg=${encodeURIComponent(response.data.message)}`;
        break;
    }
    
    return response;
  }
)

function request<T>(config: AxiosRequestConfig):AxiosPromise<T>  {
  return service(config);
}

export default request
