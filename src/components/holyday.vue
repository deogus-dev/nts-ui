<script setup>
import { useCmnStore } from '~/stores/cmn'

const cmnStore = useCmnStore()
</script>

<template>
  <div>
    <button @click="cmnStore.closeModal('holy')">close</button>
    <div class="halfModal">holyday page</div>
  </div>
</template>
