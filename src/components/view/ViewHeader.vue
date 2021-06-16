<template>
  <header class="view-header">
    <language-switcher id="language-switcher" />
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
  vertical-align: center;

  color: #282828;

  border-bottom: 1px solid #ababab;
}
</style>
