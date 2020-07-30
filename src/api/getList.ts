import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';

export function getRecommendList () {
  return axios({
    methods: 'get',
    url: '/index/recommend.json'
  } as AxiosRequestConfig)
}
