<template>
  <nav class="portal-root">
    <slot></slot>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PortalRoot extends Vue {}
</script>

<style lang="scss">
@import "portal-constants.scss";

.portal-root {
  $grid-gap: 16px;

  margin: 0px;
  display: grid;
  grid-gap: $grid-gap;
  grid-template-columns: auto auto auto;
  justify-content: center;
  align-content: center;
  //height: 100%;

  @media (max-width: 3 * $portal-card-width + 4 * $grid-gap) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 2 * $portal-card-width + 4 * $grid-gap) {
    grid-template-columns: auto;
  }
}
</style>
