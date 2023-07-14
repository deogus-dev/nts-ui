<script setup>
import HeaderLayout from '~/layout/HeaderLayout.vue'
import FooterLayout from '~/layout/FooterLayout.vue'
import holyday from '~/components/holyday.vue'
import { useCmnStore } from '~/stores/cmn'
import { useRoute } from 'vue-router'

const route = useRoute()
const cmnStore = useCmnStore()
</script>

<template>
  <HeaderLayout v-if="route.path != '/main'" />
  <router-view />
  <FooterLayout />
  <holyday class="halfModal" v-if="cmnStore.modal.holy" />
</template>
