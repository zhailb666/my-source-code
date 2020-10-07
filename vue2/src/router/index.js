import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import PartialRegistration from '@/pages/PartialRegistration'
import LifeCycle from '@/pages/LifeCycle'
import Base from '@/pages/base'
import ReuseCombination from '@/pages/reuseCombination'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/partialRegistration',
      name: 'PartialRegistration',
      component: PartialRegistration
    },
    {
      path: '/lifeCycle',
      name: 'lifeCycle',
      component: LifeCycle
    },
    {
      path: '/base',
      name: 'base',
      component: Base
    },
    {
      path: '/reuse',
      name: 'reuse',
      component: ReuseCombination
    }
  ]
})
