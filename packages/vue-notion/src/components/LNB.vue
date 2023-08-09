<template>
  <nav ref="nav" :style="{ width: `${navWidth}px` }">
    <div class="header">
      <div class="user-profile"></div>
      Leon's Notion
    </div>

    <ul>
      <WorkspaceItem
        v-for="workspace of workspaces"
        :key="workspace.id"
        :workspace="workspace"
      />
    </ul>

    <div class="actions" @click="$store.dispatch('workspace/createWorkspace')">
      <div class="action"><span class="material-icons">add</span>새로운 페이지</div>
    </div>
    <div ref="resizeHandle" class="resize-handle" @dblclick="navWidth = 240"></div>
  </nav>
</template>

<script>
import WorkspaceItem from '~/components/WorkspaceItem.vue'
import interact from 'interactjs'

export default {
  components: { WorkspaceItem },

  data() {
    return { navWidth: 240 }
  },

  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces
    },
  },

  created() {
    this.workspacesInit()
  },

  mounted() {
    this.navInit()
  },

  methods: {
    async workspacesInit() {
      await this.$store.dispatch('workspace/readWorkspaces')
    },
    navInit() {
      interact(this.$refs.nav)
        .resizable({
          edges: { right: this.$refs.resizeHandle },
        })
        .on('resizemove', (event) => {
          this.navWidth = event.rect.width
        })
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  max-width: 500px;
  min-width: 160px;
  height: 100%;
  background-color: $color-background;

  .header {
    display: flex;
    align-items: center;
    padding: 14px;
    font-weight: 700;

    .user-profile {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 10px;
      background-image: url('https://avatars.githubusercontent.com/u/79239852?v=4');
      background-size: cover;
    }
  }

  ul {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .actions {
    border-top: 1px solid $color-border;

    .action {
      display: flex;
      align-items: center;
      padding: 0 14px;
      height: 45px;
      cursor: pointer;

      &:hover {
        background-color: $color-background-hover1;
      }

      .material-icons {
        margin-right: 4px;
        color: $color-icon;
      }
    }
  }

  .resize-handle {
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: col-resize;
    transition: 0.4s;

    &:hover {
      background-color: $color-border;
    }
  }
}
</style>
