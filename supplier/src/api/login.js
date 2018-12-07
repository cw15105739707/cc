import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: `sysUsers/login`,
    method: 'post',
    data: {
      account: username,
      password
    }
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return new Promise((resolve, reject) => {
    resolve({
      code: 20000,
      data: {
        avatar: 'http://i.lasttt.com/0.jpg',
        name: 'adain',
        roles: ['admin']
      }
    })
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        code: 20000,
        data: {}
      }
    })
  })
}
