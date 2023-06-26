<template>
  <div class="footer">
    <router-link to="/main">main</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/mypage">mypage</router-link>
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
