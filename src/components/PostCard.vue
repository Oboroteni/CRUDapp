<template>
  <article class="card">
    <h3>
      <router-link :to="{ name: 'post', params: { id: post.id } }">{{ post.title }}</router-link>
    </h3>
    <p class="muted">{{ preview }}</p>
    <div class="row">
      <router-link class="btn" :to="{ name: 'post-edit', params: { id: post.id } }">Edit</router-link>
      <button class="btn danger" @click="$emit('delete', post)">Delete</button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PostCard',
  props: { post: { type: Object, required: true } },
  computed: {
    preview() {
      const b = (this.post.body || '').replace(/\n/g, ' ')
      return b.length > 100 ? b.slice(0, 100) + '…' : b
    },
  },
}
</script>
