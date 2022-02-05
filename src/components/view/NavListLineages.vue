<template>
  <ul id="root-list">
    <li>
      <router-link class="nav-link sub-link" to="/lineages/urr/">
        {{ $text("lineage-urr") }}
      </router-link>
      <router-link class="nav-link sub-link" to="/lineages/urr-dranan/">
        {{ $text("lineage-urr-dranan") }}</router-link
      >
      <router-link class="nav-link sub-link" to="/lineages/elves/">{{
        $text("lineage-elves")
      }}</router-link>
      <router-link class="nav-link sub-link" to="/lineages/ghimach/">
        {{ $text("lineage-ghimach") }}
      </router-link>
      <router-link class="nav-link sub-link" to="/lineages/halfmen/">{{
        $text("lineage-halfmen")
      }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavListLineages extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/navlist";
</style>
