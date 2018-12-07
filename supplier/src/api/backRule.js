import request from '@/utils/request'

export function getBackRules(organizationId) {
  return request({
    url: `/backRule/listByOrganizationId/${organizationId}`
  })
}

export function addBackRules(data) {
  return request({
    url: '/backRule',
    method: 'post',
    data
  })
}
