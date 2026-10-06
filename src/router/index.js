import Vue from 'vue'
import VueRouter from 'vue-router'
import PostList from '@/views/PostList.vue'
import PostDetail from '@/views/PostDetail.vue'
import PostFormView from '@/views/PostFormView.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'posts', component: PostList },
    { path: '/posts/new', name: 'post-new', component: PostFormView },
    { path: '/posts/:id', name: 'post', component: PostDetail },
    { path: '/posts/:id/edit', name: 'post-edit', component: PostFormView },
    { path: '*', redirect: '/' },
  ],
})
