<script setup lang="ts">
if (window.location.pathname == '/')
  window.location.replace("../welcome.html")

// import M from 'materialize-css'

// document.addEventListener('DOMContentLoaded', function() {
//   M.AutoInit();
// });
</script>

<template>
<!--  <RouterLink to="/admin">hello</RouterLink>-->
<!--  <h2>asfdgdfdad</h2>-->
  <RouterView></RouterView>
</template>
