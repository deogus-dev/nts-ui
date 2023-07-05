<script setup>
import HeaderLayout from '~/layout/HeaderLayout.vue'
import FooterLayout from '~/layout/FooterLayout.vue'
import holyday from '~/components/holyday.vue'
import { useCmnStore } from '~/stores/cmn'

const cmnStore = useCmnStore()
</script>

<template>
  <HeaderLayout />
  <router-view />
  <FooterLayout />
  <holyday class="halfModal" v-if="cmnStore.modal.holy" />
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
