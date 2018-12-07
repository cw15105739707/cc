import request from '@/utils/request'

export function pageQuery(params) {
  return request({
    url: '/orders/pageByOrderQueryProvider',
    method: 'get',
    params
  })
}

export function deleteOrder(id) {
  return request({
    url: `/orders/${id}`,
    method: 'delete'
  })
}

export function editOrder(data) {
  return request({
    url: `/orders`,
    method: 'put',
    data
  })
}

export function getOrderDetail(id) {
  return request({
    url: `/orders/${id}`
  })
}
