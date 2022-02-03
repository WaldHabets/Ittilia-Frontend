<template>
  <ul id="root-list">
    <li>
      <router-link class="nav-link" to="/">
        <svg viewBox="0 0 24 24">
          <path :d="iconHome" />
        </svg>
        Home
      </router-link>
    </li>
    <li>
      <router-link class="nav-link section-link" to="/ittilia">
        <svg viewBox="0 0 24 24">
          <path :d="iconExplore" />
        </svg>
        {{ $text("explore-ittilia") }}
      </router-link>
      <ul>
        <li>
          <router-link class="nav-link sub-link" to="/wiki">
            {{ $text("page-wiki") }}</router-link
          >
        </li>
        <li>
          <router-link class="nav-link sub-link" to="/map">{{
            $text("page-map")
          }}</router-link>
        </li>
        <li>
          <router-link class="nav-link sub-link" to="/lineages">
            {{ $text("page-lineage") }}
          </router-link>
        </li>
        <li>
          <router-link class="nav-link sub-link" to="/classes">{{
            $text("page-classes")
          }}</router-link>
        </li>
      </ul>
    </li>
    <li>
      <router-link class="nav-link section-link" to="/tools">
        <svg viewBox="0 0 24 24">
          <path :d="iconTools" />
        </svg>
        Tools
      </router-link>
      <ul>
        <li>
          <router-link class="nav-link sub-link" to="/tools/item-forge"
            >Item Forge</router-link
          >
        </li>
        <li>
          <router-link class="nav-link sub-link" to="/tools/initiative-tracker"
            >Initiative Tracker</router-link
          >
        </li>
        <li>
          <router-link class="nav-link sub-link" to="/tools/party-manager"
            >Character Sheets</router-link
          >
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiAnvil, mdiCastle, mdiCompassRose, mdiFeather } from "@mdi/js";

@Component
export default class NavList extends Vue {
  private iconHome: string = mdiCastle;
  private iconExplore: string = mdiCompassRose;
  private iconTools: string = mdiAnvil;
  private iconFeather: string = mdiFeather;
}
</script>

<style lang="scss">
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/colours.scss";

ul {
  list-style-type: none;
}

ul,
li {
  margin: 0px;
  padding: 0px;
}

#root-list {
  $element-height: 32px;
  $icon-size: 24px;

  padding: 0px;

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
    margin: 0px;

    height: $element-height;
    line-height: $element-height;

    display: flex;
    text-align: start;
    align-items: middle;

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
