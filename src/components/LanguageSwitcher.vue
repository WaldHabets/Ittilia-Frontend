<template>
  <select class="language-switcher">
    <option value="nl-Be">NL</option>
    <option value="en-GB">EN</option>
  </select>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LanguageSwitcher extends Vue {}
</script>

<style lang="scss">
.language-switcher {
  background: none;
  border: none;

  color: inherit;
  font-weight: 600px;
  font-size: 1rem;
}
</style>
