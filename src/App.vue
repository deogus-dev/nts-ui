<script setup>
import { computed } from 'vue'
import loading from '~/components/loading.vue'
import { useCmnStore } from '~/stores/cmn'

const appEnv = computed(() => {
  return import.meta.env.VITE_APP_PROFILE
})
</script>
<template>
  <span style="position: fixed; right: 0; margin: 10px">[Env] : {{ appEnv }}</span>
  <loading v-if="useCmnStore().isLoading" />
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in" class="h-100">
      <div :key="route?.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>
