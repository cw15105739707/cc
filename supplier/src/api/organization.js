import request from '@/utils/request'

export function getOrganization(id) {
  return request({
    url: `/organizations/${id}`
  })
}

export function updateOrganizations(data) {
  return request({
    url: 'organizations',
    method: 'put',
    data
  })
}
