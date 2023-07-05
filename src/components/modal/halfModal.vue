<script setup>
import { useCmnStore } from '~/stores/cmn.js'

const store = useCmnStore()
</script>

<template>
  <div>modal State : [ {{ store.modal.half }} ]</div>
</template>
