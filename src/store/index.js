import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/posts'

Vue.use(Vuex)

let toastId = 0
const notify = (commit, type, message) => {
  const id = ++toastId
  commit('PUSH_TOAST', { id, type, message })
  setTimeout(() => commit('DROP_TOAST', id), 3500)
}

async function run({ commit }, key, fn, success) {
  commit('SET_STATUS', { key, loading: true, error: null })
  try {
    const data = await fn()
    commit('SET_STATUS', { key, loading: false, error: null })
    if (success) notify(commit, 'success', success)
    return { ok: true, data }
  } catch (e) {
    const message = e.response ? `Request failed (${e.response.status})` : e.message
    commit('SET_STATUS', { key, loading: false, error: message })
    notify(commit, 'error', message)
    return { ok: false }
  }
}

const idle = () => ({ loading: false, error: null })

export default new Vuex.Store({
  state: {
    posts: [],
    loaded: false,
    status: { list: idle(), item: idle(), save: idle(), remove: idle() },
    toasts: [],
  },
  getters: {
    byId: (state) => (id) => state.posts.find((p) => p.id === id),
  },
  mutations: {
    SET_STATUS(state, { key, loading, error }) {
      state.status[key] = { loading, error }
    },
    SET_POSTS(state, posts) {
      state.posts = [...state.posts.filter((p) => p.local), ...posts]
      state.loaded = true
    },
    UPSERT_POST(state, post) {
      const i = state.posts.findIndex((p) => p.id === post.id)
      i === -1 ? state.posts.push(post) : state.posts.splice(i, 1, { ...state.posts[i], ...post })
    },
    ADD_POST(state, post) {
      state.posts.unshift(post)
    },
    REMOVE_POST(state, id) {
      state.posts = state.posts.filter((p) => p.id !== id)
    },
    PUSH_TOAST(state, t) {
      state.toasts.push(t)
    },
    DROP_TOAST(state, id) {
      state.toasts = state.toasts.filter((t) => t.id !== id)
    },
  },
  actions: {
    fetchPosts(ctx, force = false) {
      if (ctx.state.loaded && !force) return { ok: true }
      return run(ctx, 'list', async () => ctx.commit('SET_POSTS', await api.list()))
    },
    fetchPost(ctx, id) {
      if (ctx.getters.byId(id)) {
        ctx.commit('SET_STATUS', { key: 'item', loading: false, error: null })
        return { ok: true }
      }
      return run(ctx, 'item', async () => ctx.commit('UPSERT_POST', await api.get(id)))
    },
    createPost(ctx, values) {
      return run(
        ctx,
        'save',
        async () => {
          await api.create(values) // fake API always answers id 101, so we assign our own
          const id = Math.max(100, ...ctx.state.posts.map((p) => p.id)) + 1
          const post = { ...values, id, local: true }
          ctx.commit('ADD_POST', post)
          return post
        },
        'Post created'
      )
    },
    updatePost(ctx, post) {
      return run(
        ctx,
        'save',
        async () => {
          const existing = ctx.getters.byId(post.id)
          if (!existing.local) await api.update(post.id, { ...existing, ...post })
          ctx.commit('UPSERT_POST', post)
        },
        'Post updated'
      )
    },
    deletePost(ctx, id) {
      return run(
        ctx,
        'remove',
        async () => {
          const existing = ctx.getters.byId(id)
          if (!existing.local) await api.remove(id)
          ctx.commit('REMOVE_POST', id)
        },
        'Post deleted'
      )
    },
  },
})
