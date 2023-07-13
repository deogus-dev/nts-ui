<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <!-- <h1>header layout</h1> -->
  <button @click="goBack()">go back</button>
</template>
