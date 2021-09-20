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
        Explore Ittilia
      </router-link>
      <ul>
        <li>
          <router-link class="nav-link" to="/ittilia/book">Book</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/ittilia/map">Map</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/ittilia/classes"
            >Classes</router-link
          >
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
          <router-link class="nav-link" to="/tools/item-forge"
            >Item Forge</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/tools/initiative-tracker"
            >Initiative Tracker</router-link
          >
        </li>
        <li>
          <router-link class="nav-link" to="/tools/party-manager"
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
@import "../../scss/buttons.css";

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

  li {
    text-align: start;
    ul {
      li {
        padding-left: 32px;
      }
    }
  }

  .section-link {
    background-color: #af9e8c;
    background: linear-gradient(0deg, #978069 35%, #af9e8c 100%);
    border-radius: 16px;
  }

  .nav-link {
    box-sizing: border-box;
    text-decoration: none;
    color: inherit;

    margin: 4px 0px;

    width: 100%;
    height: $element-height;

    line-height: $element-height;

    display: flex;
    align-items: middle;

    &.router-link-exact-active:not(.section-link) {
      &::before {
        content: "❖";
      }
    }
  }
}
</style>
