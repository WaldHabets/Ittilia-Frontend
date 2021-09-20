<template>
  <select class="header-dropdown" v-model="language">
    <option value="nl">NL</option>
    <option value="en">EN</option>
  </select>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LanguageSwitcher extends Vue {
  get language(): string {
    return this.$store.state.language;
  }

  set language(value: string) {
    this.$store.dispatch("setLanguage", value);
  }
}
</script>

<style lang="scss">
@import "./header.components.scss";
</style>
