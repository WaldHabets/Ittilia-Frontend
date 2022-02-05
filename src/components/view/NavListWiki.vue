<template>
  <ul id="root-list">
    <li>
      <router-link class="nav-link section-link" to="/wiki/general/">
        {{ $text("wiki-general") }}
      </router-link>
      <router-link class="nav-link section-link" to="/wiki/cosmos/">
        {{ $text("wiki-cosmos") }}</router-link
      >
      <router-link class="nav-link section-link" to="/wiki/geography/">{{
        $text("wiki-geography")
      }}</router-link>
      <router-link class="nav-link section-link" to="/wiki/geopolitics/">
        {{ $text("wiki-geopolitics") }}
      </router-link>
      <router-link class="nav-link section-link" to="/wiki/cities/">{{
        $text("wiki-cities")
      }}</router-link>
      <router-link class="nav-link section-link" to="/wiki/people/">
        {{ $text("wiki-people") }}
      </router-link>
      <router-link class="nav-link section-link" to="/wiki/creatures/">{{
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
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/colours.scss";

ul {
  list-style-type: none;
}

ul,
li {
  margin: 0;
  padding: 0;
}

#root-list {
  $element-height: 32px;
  $icon-size: 24px;

  padding: 0;

  svg {
    width: $icon-size;
    height: $icon-size;
    padding: 4px;
    fill: currentColor;
  }

  .nav-link {
    text-decoration: none;
    color: inherit;

    padding: 8px;
    margin: 0;

    height: $element-height;
    line-height: $element-height;

    display: flex;
    text-align: start;
    align-items: center;

    &.sub-link {
      padding-left: 40px;
    }

    &.router-link-exact-active,
    &:hover {
      font-weight: bold;
      background-color: white;
      color: $view-nav-background;
    }
  }
}
</style>
