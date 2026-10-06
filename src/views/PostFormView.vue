<template>
  <section>
    <h2>{{ isEdit ? 'Edit post' : 'New post' }}</h2>

    <p v-if="loading" class="muted">Loading post…</p>
    <div v-else-if="loadError" class="error">{{ loadError }}</div>
    <PostForm
      v-else
      :initial="initial"
      :submitting="saving.loading"
      :submit-label="isEdit ? 'Update' : 'Create'"
      @submit="save"
    />
    <p v-if="saving.error" class="error">{{ saving.error }}</p>
  </section>
</template>

<script>
import PostForm from '@/components/PostForm.vue'

export default {
  name: 'PostFormView',
  components: { PostForm },
  computed: {
    isEdit() { return !!this.$route.params.id },
    id() { return Number(this.$route.params.id) },
    post() { return this.isEdit ? this.$store.getters.byId(this.id) : null },
    initial() { return this.post ? { title: this.post.title, body: this.post.body } : undefined },
    loading() { return this.isEdit && !this.post && this.$store.state.status.item.loading },
    loadError() { return this.isEdit && !this.post ? this.$store.state.status.item.error : null },
    saving() { return this.$store.state.status.save },
  },
  created() {
    if (this.isEdit) this.$store.dispatch('fetchPost', this.id)
  },
  methods: {
    async save(values) {
      if (this.isEdit) {
        const { ok } = await this.$store.dispatch('updatePost', { id: this.id, ...values })
        if (ok) this.$router.push({ name: 'post', params: { id: this.id } })
      } else {
        const { ok, data } = await this.$store.dispatch('createPost', { userId: 1, ...values })
        if (ok) this.$router.push({ name: 'post', params: { id: data.id } })
      }
    },
  },
}
</script>
