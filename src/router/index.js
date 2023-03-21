import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LayersView from '../views/LayersView.vue'
import SettingsView from '../views/SettingsView.vue'
import AdministrativeBoundariesView from '../views/AdministrativeBoundariesView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      redirect: '/settings/layers',
      children: [
        {
          path: 'layers',
          name: 'layers',
          component: LayersView
        },
        {
          path: 'administrative-boundaries',
          name: 'administrative-boundaries',
          component: AdministrativeBoundariesView
        }
      ]
    },
  ]
})

export default router
