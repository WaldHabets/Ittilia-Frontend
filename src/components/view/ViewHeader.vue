<template>
  <header class="view-header">
    <section class="view-header-section align-start">
      <language-switcher id="language-switcher" />
      <slot name="start"></slot>
    </section>

    <section class="view-header-section align-center">
      <slot name="center"></slot>
    </section>

    <section class="view-header-section align-end">
      <slot name="end"></slot>
    </section>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

@Component({
  components: { LanguageSwitcher },
})
export default class ViewHeader extends Vue {}
</script>

<style lang="scss">
.view-header {
  box-sizing: border-box;
  padding: 8px 16px;

  display: flex;
  // vertical-align: center;

  color: #282828;

  height: 100%;

  border-bottom: 1px solid #ababab;

  .view-header-section {
    flex-grow: 1;

    display: flex;
    align-items: center;

    &.align-start {
      justify-content: flex-start;
    }
    &.align-center {
      justify-content: center;
    }
    &.align-end {
      justify-content: flex-end;
    }
  }
}

@media print {
  .view-header {
    display: none;
  }
}
</style>
