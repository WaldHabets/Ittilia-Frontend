<template>
  <select class="header-dropdown">
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
@import "./header.components.scss";
</style>
