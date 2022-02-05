<template>
  <div v-show="isShown" class="dialog" @click="hideDialog">
    <div class="dialog-body"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Dialog extends Vue {
  private isShown = false;

  public hide(): void {
    this.isShown = false;
  }

  public show(): void {
    this.isShown = true;
  }
}
</script>

<style lang="scss" scoped>
.class {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;

  position: absolute;
  top: 0;
  left: 0;

  .dialog-body {
    background: white;
    margin: 32px;
    width: calc(100% - 64px);
    max-width: 600px;
    max-height: calc(100% - 64px);
  }
}
</style>
