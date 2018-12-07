import request from '@/utils/request'

export function getDepartures(routeId) {
  return request({
    url: `/departure/listByRouteId/${routeId}`
  })
}

export function addDeparture(data) {
  return request({
    url: '/departure',
    method: 'post',
    data
  })
}

export function batchAddDeparture(data) {
  return request({
    url: '/departure/batchAdd',
    method: 'post',
    data
  })
}

export function deleteDeparture(id) {
  return request({
    url: `/departure/${id}`,
    method: 'delete'
  })
}
