<script setup>
import HeaderLayout from '~/layout/HeaderLayout.vue'
import FooterLayout from '~/layout/FooterLayout.vue'
</script>

<template>
    <div>
        <HeaderLayout/>
        <router-view/>
        <FooterLayout/>
    </div>
</template>