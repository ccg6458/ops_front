import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/pages/user/UserList'
import PermissionList from '@/pages/permission/PermissionList'
import EmailLogin from '@/pages/login/EmailLogin'
import BusinessList from '@/pages/business/BusinessList'
import TaskList from '@/pages/task/TaskList'
import Loglist from '@/pages/log/LogList'
import WorkOrderList from '@/pages/workorder/WorkOrderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'EmailLogin',
      component: EmailLogin
    },
    {
      path: '/user',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/permission',
      name: 'PermissionList',
      component: PermissionList
    },
    {
      path: '/business',
      name: 'businesslist',
      component: BusinessList
    },
    {
      path: '/task',
      name: 'tasklist',
      component: TaskList
    },
    {
      path: '/order',
      name: 'workorderlist',
      component: WorkOrderList
    },
    {
      path: '/audit',
      name: 'audit',
      component: Loglist
    }
  ]
})
