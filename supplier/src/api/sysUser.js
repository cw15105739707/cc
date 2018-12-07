import request from '@/utils/request'

export function getSysUser(params) {
  return request({
    url: '/sysUsers/page',
    params
  })
}

export function addSysUser(data) {
  return request({
    url: '/sysUsers',
    method: 'post',
    data
  })
}
