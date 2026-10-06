<template>
  <div v-if="show" class="overlay" @click.self="$emit('cancel')">
    <div class="modal" role="dialog" aria-modal="true">
      <h3>{{ title }}</h3>
      <p class="muted">{{ message }}</p>
      <div class="row">
        <button class="btn danger" :disabled="busy" @click="$emit('confirm')">
          {{ busy ? 'Deleting…' : 'Delete' }}
        </button>
        <button class="btn" :disabled="busy" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    show: Boolean,
    busy: Boolean,
    title: { type: String, default: 'Are you sure?' },
    message: String,
  },
}
</script>
