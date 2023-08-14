<script setup lang="ts">
import SiteNavigation from '~/components/SiteNavigation.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView />
  </div>
</template>
