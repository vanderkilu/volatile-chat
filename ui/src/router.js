import Vue from 'vue'
import Router from 'vue-router'
import ChatList from './components/ChatList.vue'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
  },
   {
       path: '/chatlist',
       name: 'chatList',
       component: ChatList
   }
  ]
})
