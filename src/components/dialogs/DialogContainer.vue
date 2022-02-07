<template>
  <div v-show="open" class="dialog-container">
    <div class="dialog-backdrop" @click="hide"></div>
    <dialog class="dialog-body" v-bind:open="open">
      <slot name="header"></slot>
      <slot name="content"></slot>
      <slot name="footer"></slot>
    </dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class DialogContainer extends Vue {
  private open = false;

  @Emit("hide")
  public hide(): void {
    this.open = false;
  }

  @Emit("show")
  public show(): void {
    this.open = true;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colours.scss";
.dialog-container {
  // position
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;
  //size
  width: 100%;
  height: 100%;
  .dialog-backdrop {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    margin: 0;
    padding: 0;
  }
  .dialog-body {
    background: white;
    margin: 32px auto;
    width: calc(100% - 64px);
    max-width: 600px;
    max-height: calc(100% - 64px);

    border-radius: 4px;
    position: fixed;
    top: 0;
    z-index: 10002;

    border: 1px solid $border;
  }
}
</style>
