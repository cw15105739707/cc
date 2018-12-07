import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/routes',
    component: Layout,
    redirect: '/routes/lists',
    name: 'Routes',
    meta: { title: '线路管理', icon: 'tree' },
    children: [
      {
        path: 'lists',
        name: 'RoutesLists',
        component: () => import('@/views/routesList/index'),
        meta: { title: '线路列表', icon: 'route' }
      },
      // {
      //   path: 'edit/:id',
      //   hidden: true,
      //   name: 'RoutesEdit',
      //   component: () => import('@/views/routesList/edit')
      // },
      {
        path: 'edit',
        hidden: true,
        name: 'RoutesEdit',
        component: () => import('@/views/routesList/edit/index'),
        children: [
          {
            path: 'step1/:id',
            hidden: true,
            component: () => import('@/views/routesList/edit/step1')
          },
          {
            path: 'step2/:id',
            hidden: true,
            component: () => import('@/views/routesList/edit/step2')
          },
          {
            path: 'step3/:id',
            hidden: true,
            component: () => import('@/views/routesList/edit/step3')
          }
        ]
      },
      {
        path: 'schedule/:id',
        name: 'ScheduleList',
        hidden: true,
        component: () => import('@/views/schedule/index'),
        meta: { title: '排期列表' }
      },
      {
        path: 'schedule/edit/:route/:id',
        name: 'ScheduleEdit',
        hidden: true,
        component: () => import('@/views/schedule/edit'),
        meta: { title: '排期编辑' }
      },
      {
        path: 'schedule/multipleClone/:route/:id',
        name: 'ScheduleMultipleClone',
        hidden: true,
        component: () => import('@/views/schedule/multipleClone'),
        meta: { title: '批量克隆排期' }
      },
      {
        path: 'schedule/singleClone/:route/:id',
        name: 'SchedulesingleClone',
        hidden: true,
        component: () => import('@/views/schedule/singleClone'),
        meta: { title: '单一克隆排期' }
      }
      // {
      //   path: 'backRule',
      //   name: 'BackRule',
      //   hidden: true,
      //   component: () => import('@/views/backRule/index'),
      //   meta: { title: '退款规则' }
      // }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/list',
    name: 'Orders',
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/orders/list'),
        meta: { title: '订单列表', icon: 'orderList' }
      },
      {
        path: 'detail/:id',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('@/views/orders/detail'),
        meta: { title: '订单详情' }
      },
      {
        path: 'refund',
        name: 'RefundRecord',
        component: () => import('@/views/orders/refund'),
        meta: { title: '退款列表', icon: 'refund' }
      }
    ]
  },

  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement/list',
    name: 'Settlement',
    meta: { title: '结算管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/settlement/list'),
        meta: { title: '待结算列表', icon: 'table' }
      },
      {
        path: 'settled',
        name: 'Settled',
        component: () => import('@/views/settlement/settled'),
        meta: { title: '已结算列表', icon: 'table' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/settlement/Setting'),
        meta: { title: '结算设置', icon: 'tree' }
      }
    ]
  },

  {
    path: '/userAuth',
    name: 'UserAuth',
    component: Layout,
    redirect: '/userAuth/list',
    meta: { title: '权限管理', icon: 'tree' },
    children: [
      {
        path: 'list',
        name: 'UserAuthList',
        component: () => import('@/views/userAuth/list'),
        meta: { title: '管理员列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/asset',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Asset',
        component: () => import('@/views/assetView/index'),
        meta: { title: '资金管理', icon: 'money' }
      }
    ]
  },
  {
    path: '/orgnization',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Orgnization',
        component: () => import('@/views/orgnization/index'),
        meta: { title: '商家中心', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
