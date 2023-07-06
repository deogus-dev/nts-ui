<script setup>
import { onMounted, ref } from 'vue'
import Lottie from 'lottie-web'
import animationData from '@/assets/image/loading_white.json'

const lottieContainer = ref(null)
const anim = ref(null)

onMounted(() => {
  anim.value = Lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData
  })
})
</script>

<template>
  <div class="home">
    <div ref="lottieContainer"></div>
  </div>
</template>

<style scoped>
.home {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(255, 255, 255, 0.2);
}
</style>
