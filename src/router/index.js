import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Events from '../views/Events.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  },
  {
    path: '/',
    beforeEnter() {
      window.location = '/';
    },
  },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
//   },
];

const router = new VueRouter({
  routes,
});

export default router;
