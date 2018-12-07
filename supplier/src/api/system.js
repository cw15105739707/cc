import request from '@/utils/request'

export function listProvinces() {
  return request({
    url: '/provinces/list',
    method: 'get'
  })
}

export function listCities(parentCode) {
  return request({
    url: `/cities/listByParentCode/${parentCode}`,
    method: 'get'
  })
}

export function listAreas(parentCode) {
  return request({
    url: `/areas/listByParentCode/${parentCode}`,
    method: 'get'
  })
}

export function listStreets(parentCode) {
  return request({
    url: `/streets/listByParentCode/${parentCode}`,
    method: 'get'
  })
}

// 获取 oss 临时权限
export function getOSSToken() {
  return request({
    url: '/sts/getALiYunOSSToken',
    method: 'get'
  })
}
