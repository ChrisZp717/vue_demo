import Vue from 'vue';
import VueRouter from 'vue-router';

import Interface from '../components/Interface.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/interfaceA'
    },
    {
      path: '/interface:id',
      component: Interface
    }
  ]
})
