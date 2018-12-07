import request from '@/utils/request'

export function batchAdd(data) {
  return request({
    url: '/packageTour/batchAdd',
    method: 'post',
    data
  })
}

export function getPackageTour(scheduleId) {
  return request({
    url: `/packageTour/listByScheduleId/${scheduleId}`
  })
}
