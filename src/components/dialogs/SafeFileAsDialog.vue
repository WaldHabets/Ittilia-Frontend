<template>
  <dialog-container ref="container" @hide="reset">
    <template #content>
      <form @submit.prevent class="save-as-dialog">
        <input
          id="meta-groupname"
          type="text"
          v-model="filename"
          :placeholder="$text('filename')"
          class="text-input"
        />
        <button
          id="save-file-as-cancel"
          class="flat-button"
          :title="$text('action-cancel')"
          @click="cancel"
        >
          {{ $text("action-cancel") }}
        </button>
        <button
          id="meta-save"
          class="button"
          :title="$text('action-save')"
          @click="save"
        >
          {{ $text("action-save") }}
        </button>
      </form>
    </template>
  </dialog-container>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import DialogContainer from "@/components/dialogs/DialogContainer.vue";
@Component({
  components: { DialogContainer },
})
export default class SaveFileAsDialog extends Vue {
  private filename = "";

  @Emit()
  cancel(): void {
    this.hide();
  }

  @Emit()
  save(): string {
    const filename = this.filename;
    this.hide();
    return filename;
  }

  show(): void {
    if (this.$refs.container != undefined) {
      const container = this.$refs.container as DialogContainer;
      container.show();
    }
  }

  hide(): void {
    if (this.$refs.container != undefined) {
      const container = this.$refs.container as DialogContainer;
      container.hide();
    }
  }

  private reset(): void {
    this.filename = "";
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/buttons.css";
.save-as-dialog {
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
