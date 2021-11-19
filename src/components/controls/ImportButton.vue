<template v-slot:start>
  <div>
    <label
      id="button-file-open"
      for="file-open"
      :title="s.get('action-import')"
      class="button"
    >
      <svg viewBox="0 0 24 24" fill="white">
        <path :d="mdiArrowPrev" />
      </svg>
    </label>
    <input
      id="file-open"
      type="file"
      v-on:change="change"
      style="display: none"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import Strings from "@/helpers/Strings.ts";

import { mdiFolderOpenOutline } from "@mdi/js";

@Component
export default class ImportButton extends Vue {
  private readonly s: Strings = new Strings();
  private readonly mdiArrowPrev: string = mdiFolderOpenOutline;

  @Emit()
  change(event: Event): Event {
    return event;
  }
}
</script>

<style scoped>
@import "../../assets/scss/buttons.css";
#button-file-open {
  width: 41px;
  height: 41px;

  display: block;
  box-sizing: border-box;
}
</style>
