<template>
  <section>
    <router-link class="btn" :to="{ name: 'posts' }">← Back</router-link>

    <p v-if="status.loading" class="muted">Loading post…</p>
    <div v-else-if="status.error" class="error">
      {{ status.error }} <button class="btn" @click="load">Retry</button>
    </div>
    <article v-else-if="post" class="card">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <div class="row">
        <router-link class="btn" :to="{ name: 'post-edit', params: { id: post.id } }">Edit</router-link>
        <button class="btn danger" @click="confirming = true">Delete</button>
      </div>
    </article>

    <ConfirmModal
      :show="confirming"
      :busy="removing"
      message="This will permanently remove this post."
      @confirm="remove"
      @cancel="confirming = false"
    />
  </section>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
  name: 'PostDetail',
  components: { ConfirmModal },
  data: () => ({ confirming: false }),
  computed: {
    id() { return Number(this.$route.params.id) },
    post() { return this.$store.getters.byId(this.id) },
    status() { return this.$store.state.status.item },
    removing() { return this.$store.state.status.remove.loading },
  },
  watch: { id: 'load' },
  created() { this.load() },
  methods: {
    load() { this.$store.dispatch('fetchPost', this.id) },
    async remove() {
      const { ok } = await this.$store.dispatch('deletePost', this.id)
      this.confirming = false
      if (ok) this.$router.push({ name: 'posts' })
    },
  },
}
</script>
