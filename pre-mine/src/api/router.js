import request from '@/utils/request'

export function requestPage(params) {
  return request({
    url: '/route/pageQuery',
    method: 'get',
    params
  })
}

export function deleteRouter(id) {
  return request({
    url: `/route/${id}`
  })
}

export function requestRouterInfo(id) {
  return request({
    url: `/route/${id}`,
    method: 'get'
  })
}

export function requestRouterCategorysPageAll(params) {
  return request({
    url: '/routeCategorys/pageAll',
    method: 'get',
    params
  })
}

export function requestProvincesPage() {
  return request({
    url: '/provinces/list',
    method: 'get'
  })
}

export function requestCityPage(parentCode) {
  return request({
    url: `/cities/listByParentCode/${parentCode}`,
    method: 'get'
  })
}

export function requestAreaPage(paretCode) {
  return request({
    url: `/areas/listByParentCode/${paretCode}`,
    method: 'get'
  })
}

export function requestStreetPage(parentCode) {
  return request({
    url: `/streets/listByParentCode/${parentCode}`,
    method: 'get'
  })
}
