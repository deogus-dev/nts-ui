<script setup>
import { computed } from 'vue'
import loading from '~/components/loading.vue'
import { useCmnStore } from '~/stores/cmn'

const apiUrl = computed(() => {
  return import.meta.env.VITE_APP_API_URL
})
</script>
<template>
  {{ apiUrl }}
  <loading v-if="useCmnStore().isLoading" />
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in">
      <div :key="route?.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>
