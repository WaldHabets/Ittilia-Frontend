<template>
  <div id="side-view" v-bind:class="{ hidden: hidden }">
    <button id="side-view-button" @click="hide">
      <svg v-if="hidden" viewBox="0 0 24 24">
        <path :d="iconArrowExpandLeft" />
      </svg>
      <svg v-else viewBox="0 0 24 24">
        <path :d="iconClose" />
      </svg>
    </button>
    <div id="side-view-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiArrowExpandLeft, mdiClose } from "@mdi/js";

@Component
export default class Side extends Vue {
  private hidden = true;
  private iconArrowExpandLeft = mdiArrowExpandLeft;
  private iconClose = mdiClose;

  hide(): void {
    this.hidden = !this.hidden;
  }
}
</script>

<style lang="scss">
#side-view {
  display: block;
  box-sizing: border-box;
  max-width: 400px;
  position: absolute;
  right: 0px;
  top: 0px;

  height: 100%;
  max-height: 100%;

  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.7);

  transition: right 0.5s;

  &.hidden {
    right: -400px;
  }

  #side-view-content {
    box-sizing: border-box;
    position: relative;

    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: default;

    padding: 16px;
    background: white;
    z-index: 1;
  }

  #side-view-button {
    $button-dim: 48px;

    box-sizing: border-box;
    width: $button-dim;
    height: $button-dim;

    position: absolute;
    left: -$button-dim;
    top: 16px;

    box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.7);
    background: white;
    border: none;
    border-radius: 50% 0 0 50%;
    z-index: 0;

    margin: 0px 0px;
    padding: 8px;
    font-weight: 700;
    vertical-align: middle;

    svg {
      fill: #282828;
    }
  }
}
</style>
