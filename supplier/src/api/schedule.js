import request from '@/utils/request'

// 添加排期
export function addSchedule(data) {
  return request({
    url: '/schedule',
    method: 'post',
    data
  })
}

// 批量添加排期
export function batchAddSchedule(data) {
  return request({
    url: '/schedule/batchAdd',
    method: 'post',
    data
  })
}

// 获取排期列表
export function listSchedule(routeId) {
  return request({
    url: `/schedule/listByRouteId/${routeId}`
  })
}

// 删除排期
export function deleteSchedule(id) {
  return request({
    url: `/schedule/${id}`,
    method: 'delete'
  })
}

// 根据id获取排期的数据
export function getSchedule(id) {
  return request({
    url: `/schedule/${id}`
  })
}

// 修改排期
export function editSchedule(data) {
  return request({
    url: '/schedule',
    method: 'put',
    data
  })
}
