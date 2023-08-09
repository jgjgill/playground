<template>
  <div class="app_inner">
    <LNB />
    <div class="app_page">
      <Header />
      <div class="page_container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import LNB from '~/components/LNB'
import Header from '~/components/Header'

export default {
  components: { LNB, Header },
}
</script>

<style lang="scss" scoped>
.app_inner {
  display: flex;
  height: 100vh;
  color: $color-font;
  font-size: 14px;
  line-height: 1.4;
  font-family: 'Noto Sans KR', sans-serif;

  .app_page {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    .page_header {
      height: 80px;
    }

    .page_container {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
}
</style>
