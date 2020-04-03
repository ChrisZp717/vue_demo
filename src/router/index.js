import Vue from 'vue';
import VueRouter from 'vue-router';

import InterfaceA from '../components/InterfaceA.vue';
import InterfaceB from '../components/InterfaceB.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/interfaceA'
    },
    {
      path: '/interfaceA',
      component: InterfaceA
    },
    {
      path: '/interfaceB',
      component: InterfaceB
    }
  ]
})
