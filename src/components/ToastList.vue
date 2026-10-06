<template>
  <div class="toasts">
    <div v-for="t in toasts" :key="t.id" :class="['toast', t.type]">{{ t.message }}</div>
  </div>
</template>

<script>
export default {
  name: 'ToastList',
  computed: { toasts() { return this.$store.state.toasts } },
}
</script>
