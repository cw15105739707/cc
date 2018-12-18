'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5bdbed17693eea611da3d854/supplier"',
  BASE_API: '"https://www.lxzaixian.com/lxzaixian"',
})
