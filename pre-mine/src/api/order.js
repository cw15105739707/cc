import request from '@/utils/request'

export function retrieveData(params) {
  return request({
    url: '/orders/pageByOrderQueryProvider',
    method: 'get',
    params
  })
}

export function requestDetail(id) {
  return request({
    url: `/orders/detail/${id}`,
    method: 'get'
  })
}
