<template>
  <form class="form" novalidate @submit.prevent="submit">
    <label>
      Title
      <input v-model.trim="title" type="text" :class="{ invalid: errors.title }" />
      <small v-if="errors.title" class="error-text">{{ errors.title }}</small>
    </label>
    <label>
      Body
      <textarea v-model.trim="body" rows="6" :class="{ invalid: errors.body }" />
      <small v-if="errors.body" class="error-text">{{ errors.body }}</small>
    </label>
    <div class="row">
      <button class="btn primary" type="submit" :disabled="submitting">
        {{ submitting ? 'Saving…' : submitLabel }}
      </button>
      <router-link class="btn" :to="{ name: 'posts' }">Cancel</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'PostForm',
  props: {
    initial: { type: Object, default: () => ({ title: '', body: '' }) },
    submitting: Boolean,
    submitLabel: { type: String, default: 'Save' },
  },
  data() {
    return { title: this.initial.title, body: this.initial.body, errors: {} }
  },
  methods: {
    validate() {
      const errors = {}
      if (!this.title) errors.title = 'Title is required'
      else if (this.title.length < 3) errors.title = 'Title must be at least 3 characters'
      if (!this.body) errors.body = 'Body is required'
      this.errors = errors
      return !Object.keys(errors).length
    },
    submit() {
      if (this.validate()) this.$emit('submit', { title: this.title, body: this.body })
    },
  },
}
</script>
