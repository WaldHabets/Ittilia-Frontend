<template>
  <div v-show="open" class="dialog-backdrop" @click="hide">
    <dialog class="dialog-body" v-bind:open="open">

    </dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DialogBase extends Vue {
  private open = false;

  public hide(): void {
    this.open = false;
  }

  public show(): void {
    this.open = true;
  }
}
</script>

<style lang="scss" scoped>
.dialog-backdrop {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;

  .dialog-body {
    background: white;
    margin: 32px auto;
    width: calc(100% - 64px);
    max-width: 600px;
    max-height: calc(100% - 64px);

    border-radius: 4px;
  }
}
</style>
