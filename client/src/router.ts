import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import Login from './views/login.vue';
import Category from './views/admin/category.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin/category',
      name: 'category',
      component: Category,
    },
  ],
});
