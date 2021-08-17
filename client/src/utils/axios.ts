import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { createBrowserHistory } from 'history';
const service = axios.create({
  timeout: 60 * 1000, // 请求超时时间
});

// 响应拦截器
service.interceptors.response.use((response) => {
  const location = createBrowserHistory();

  switch (response.data.status) {
    case 1001:
    case 1002:
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      // location.replace(`/login`);
      window.location.href = `/login?redirect=${
        location.location.pathname
      }&failMsg=${encodeURIComponent(response.data.message)}`;
      break;
  }

  return response;
});

function request<T>(config: AxiosRequestConfig): AxiosPromise<T> {
  return service(config);
}

export default request;
