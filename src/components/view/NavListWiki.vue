<template>
  <ul id="root-list">
    <li>
      <router-link class="nav-link sub-link" to="/wiki/general/">
        {{ $text("wiki-general") }}
      </router-link>
      <router-link class="nav-link sub-link" to="/wiki/cosmos/">
        {{ $text("wiki-cosmos") }}</router-link
      >
      <router-link class="nav-link sub-link" to="/wiki/geography/">{{
        $text("wiki-geography")
      }}</router-link>
      <router-link class="nav-link sub-link" to="/wiki/geopolitics/">
        {{ $text("wiki-geopolitics") }}
      </router-link>
      <router-link class="nav-link sub-link" to="/wiki/cities/">{{
        $text("wiki-cities")
      }}</router-link>
      <router-link class="nav-link sub-link" to="/wiki/people/">
        {{ $text("wiki-people") }}
      </router-link>
      <router-link class="nav-link sub-link" to="/wiki/creatures/">{{
        $text("wiki-creatures")
      }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavListWiki extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/navlist";
</style>
