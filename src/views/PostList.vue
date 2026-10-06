<template>
  <section>
    <div class="row between">
      <input v-model.trim="query" class="search" placeholder="Search by title…" />
      <router-link class="btn primary" :to="{ name: 'post-new' }">New post</router-link>
    </div>

    <p v-if="status.loading" class="muted">Loading posts…</p>
    <div v-else-if="status.error" class="error">
      {{ status.error }} <button class="btn" @click="load(true)">Retry</button>
    </div>
    <p v-else-if="!filtered.length" class="muted">No posts found.</p>
    <template v-else>
      <PostCard v-for="p in paged" :key="p.id" :post="p" @delete="target = $event" />
      <div class="row between">
        <button class="btn" :disabled="page === 1" @click="page--">Prev</button>
        <span class="muted">Page {{ page }} of {{ pageCount }}</span>
        <button class="btn" :disabled="page === pageCount" @click="page++">Next</button>
      </div>
    </template>

    <ConfirmModal
      :show="!!target"
      :busy="removing"
      message="This will remove the post from the list."
      @confirm="confirmDelete"
      @cancel="target = null"
    />
  </section>
</template>

<script>
import PostCard from '@/components/PostCard.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
  name: 'PostList',
  components: { PostCard, ConfirmModal },
  data: () => ({ query: '', page: 1, perPage: 10, target: null }),
  computed: {
    status() { return this.$store.state.status.list },
    removing() { return this.$store.state.status.remove.loading },
    filtered() {
      const q = this.query.toLowerCase()
      return this.$store.state.posts.filter((p) => p.title.toLowerCase().includes(q))
    },
    pageCount() { return Math.max(1, Math.ceil(this.filtered.length / this.perPage)) },
    paged() {
      const start = (this.page - 1) * this.perPage
      return this.filtered.slice(start, start + this.perPage)
    },
  },
  watch: { query() { this.page = 1 } },
  created() { this.load() },
  methods: {
    load(force = false) { this.$store.dispatch('fetchPosts', force) },
    async confirmDelete() {
      await this.$store.dispatch('deletePost', this.target.id)
      this.target = null
      if (this.page > this.pageCount) this.page = this.pageCount
    },
  },
}
</script>
