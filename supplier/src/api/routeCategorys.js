import request from '@/utils/request'

export function pageAll(params) {
  return request({
    url: '/routeCategorys/pageAll',
    method: 'get',
    params
  })
}
