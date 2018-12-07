import request from '@/utils/request'

export function pageQuery(params) {
  return request({
    url: '/route/pageQuery',
    method: 'get',
    params
  })
}

export function deleteRoute(id) {
  return request({
    url: `/route/${id}`,
    method: 'delete'
  })
}

export function addRoute(data) {
  return request({
    url: '/route',
    method: 'post',
    data
  })
}

export function getRoute(id) {
  return request({
    url: `/route/${id}`
  })
}

export function editRoute(data) {
  return request({
    url: `/route`,
    method: 'put',
    data
  })
}
