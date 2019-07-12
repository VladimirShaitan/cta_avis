import Vue from 'vue'
import VueRouter from 'vue-router'
import cta_main from '../../components/cta_main.vue';
import cta_finish from '../../components/cta_finish.vue';

Vue.use(VueRouter);

const routes = [
    {name: 'cta_main', path: '/', component: cta_main},
    {name: 'cta_finish', path: '/finish', component: cta_finish},
    {path: "*", component: cta_main }
];

export default new VueRouter({
  mode: 'history',
  routes
})
