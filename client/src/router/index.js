import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import Attendance from '@/components/Attendance'
import Import from '@/components/Import'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/posts/attendance',
      name: 'Attendance',
      component: Attendance
    },
    {
      path: '/import',
      name: 'Import',
      component: Import
    }
  ]
})
