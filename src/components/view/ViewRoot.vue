<template>
  <div id="view-root">
    <slot name="header"></slot>
    <div id="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ViewRoot extends Vue {}
</script>

<style lang="scss">
#view-root {
  height: 100%;

  display: grid;
  grid-template-rows: 64px auto;

  #content {
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
