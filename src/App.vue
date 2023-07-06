<script setup>
import loading from '~/components/loading.vue'
import { useCmnStore } from '~/stores/cmn'
</script>
<template>
  <loading v-if="useCmnStore().isLoading" />
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in">
      <div :key="route?.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>
