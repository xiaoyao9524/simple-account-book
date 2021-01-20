import axios from 'axios';

interface IGetRecommendListParamsProps {
  a?: string;
  b?: string;
}

export function getRecommendList (params: IGetRecommendListParamsProps) {
  return axios({
    method: 'get',
    url: '/index/recommend.json',
    params
  })
}
