import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import main from '../../components/main.vue';
import finish from '../../components/finish.vue';

const routes = [
    {name: 'main', path: '/', component: main},
    {name: 'finish', path: '/finish', component: finish},
    {path: "*", component: main }
];

export default new VueRouter({
  mode: 'history',
  routes
})
