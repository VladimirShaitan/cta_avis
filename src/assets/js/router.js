import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {name: 'main', path: '/', component: enterId},
  // {name: 'review', path: '/review', component: leaveReview },
  // {name: 'contact-form', path: '/get-started', component: contactForm },
  // {name: 'nps',  path: '/nps', component: npsForm },
  // {name: 'finish', path: '/thanks', component: finish },
  // {name: 'terms', path: '/terms-of-use', component: terms },
  // { path: "*", component: enterId }
];

export default new VueRouter({
  mode: 'history',
  routes
})
