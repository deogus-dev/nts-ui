<template>
  <div class="footer">
    <router-link to="/main">main</router-link>
    <router-link :to="{ name: 'history' }">history</router-link>
    <router-link :to="{ name: 'holyday' }">holyday</router-link>
    <router-link :to="{ name: 'mypage' }">myPage</router-link>
  </div>
</template>

<style>
.footer {
  display: flex;
  justify-content: space-between;
}

.footer > router-link {
  color: blue;
}
</style>
