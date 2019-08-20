<template>
  <div id="app" class="d-flex align-items-center">
    <router-view />
    <footer>
      <router-link to="/" class="float-left">Imppressum</router-link>
      <router-link to="/registration" class="float-right">Datenschutz</router-link>
    </footer>
  </div>
</template>
