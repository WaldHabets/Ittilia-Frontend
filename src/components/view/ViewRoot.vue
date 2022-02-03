<template>
  <div id="view-root">
    <div id="view-nav-head">
      <button
        id="view-nav-toggle"
        @click="toggleHide"
        aria-controls="view-nav-body"
        :title="viewNavToggleTitle"
      >
        <svg v-if="isHidden" viewBox="0 0 24 24">
          <path :d="mdiMenu" />
        </svg>
        <svg v-else viewBox="0 0 24 24">
          <path :d="mdiClose" />
        </svg>
      </button>
    </div>
    <nav
      id="view-nav-body"
      :class="{ hide: isHidden }"
      aria-label="website"
      :aria-expanded="!isHidden"
    >
      <nav-list />
    </nav>
    <div id="view-content-head">
      <slot name="header"></slot>
    </div>
    <div id="view-content-body">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavList from "@/components/view/NavList.vue";
import { mdiMenu, mdiClose } from "@mdi/js";

@Component({
  components: {
    NavList,
  },
})
export default class ViewRoot extends Vue {
  private mdiMenu: string = mdiMenu;
  private mdiClose: string = mdiClose;
  private isHidden = true;

  get viewNavToggleTitle(): string {
    if (this.isHidden) {
      return this.$store.getters.text("action-show-menu");
    } else {
      return this.$store.getters.text("action-hide-menu");
    }
  }

  toggleHide(): void {
    this.isHidden = !this.isHidden;
  }
}
</script>

<style lang="scss">
#view-root {
  $head-height: 64px;
  $nav-width: 256px;
  $threshold: 1052px;

  height: 100%;

  display: grid;
  grid-template-areas:
    "view-nav-head header"
    "view-nav-body main";
  grid-template-rows: $head-height auto;
  grid-template-columns: $nav-width auto;

  @media screen and (max-width: $threshold) {
    grid-template-areas:
      "view-nav-head header"
      //"view-nav-body view-nav-body"
      "main main";
    grid-template-rows: $head-height auto;
    grid-template-columns: $head-height auto;
  }

  #view-content-head {
    width: 100%;
  }

  #view-nav-head {
    grid-area: view-nav-head;
    background-color: #080016;
    border-bottom: 1px solid #ababab;

    display: flex;
    align-items: center;

    @media screen and (max-width: $threshold) {
      background: white;
    }

    #view-nav-toggle {
      box-sizing: border-box;
      width: 48px;
      height: 48px;

      padding: 4px;

      border: none;
      background: none;

      display: none;

      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        fill: #282828;
      }

      @media screen and (max-width: $threshold) {
        display: inline-block;
      }
    }
  }

  #view-nav-body {
    position: relative;
    z-index: 10;

    grid-area: view-nav-body;
    background-color: #080016;

    color: white;

    padding: 16px 0px;

    box-sizing: border-box;

    @media screen and (max-width: $threshold) {
      transition: height 1s;

      position: fixed;
      top: $head-height;
      width: 100%;
      height: calc(100% - #{$head-height});
      overflow-y: scroll;

      &.hide {
        height: 0px;
        overflow: hidden;
        padding: 0px;
        display: none;
      }
    }
  }

  #view-content-body {
    position: relative;
    z-index: 0;

    grid-area: main;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}

@media print {
  // When printing show only the main area and hide the rest
  #view-root {
    grid-template-areas: "main";

    grid-template-rows: auto;
    grid-template-columns: auto;

    #view-nav-head,
    #view-nav-body {
      display: none;
    }

    #view-content-body {
      overflow-y: visible;
      height: max-content;
    }
  }
}
</style>
