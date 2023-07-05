<script setup>
import kakaoMap from '~/component/kakaoMap'
const props = defineProps({
  modalName: {
    type: String
  }
})
</script>

<template>
  <kakaoMap v-if="modalName === 'kakaoMap'" />
</template>
