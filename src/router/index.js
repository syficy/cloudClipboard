import Vue from 'vue'
import VueRouter from 'vue-router'
import NormalIndex from "../views/NormalIndex";


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'NormalIndex',
    component: NormalIndex
  },
]

const router = new VueRouter({
  routes
})

export default router
