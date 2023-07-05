<script setup>
import { computed } from 'vue'
</script>
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in">
      <div :key="route?.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>
