import request from '@/utils/request'

export function batchAddImages(data) {
  return request({
    url: '/routeCarouselImages/batchAdd',
    method: 'post',
    data
  })
}

export function getCarouselImage(routerId) {
  return request({
    url: `/routeCarouselImages/listByRouteId/${routerId}`
  })
}

export function deleteCarouselImage(id) {
  return request({
    url: `/routeCarouselImages/${id}`,
    method: 'delete'
  })
}
