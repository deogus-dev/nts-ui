<script setup>
import { computed } from 'vue'
// testcommit
const profile = computed(() => {
  return import.meta.env.VITE_APP_API_URL
})
</script>
<template>
  <p>API URL : [{{ profile }}]</p>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in">
      <div :key="route?.name" class="Im-root-element">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: opacity 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
