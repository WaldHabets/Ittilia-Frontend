<template>
  <div id="view-root">
    <div id="nav-head">
      <button id="nav-toggle" @click="toggleHide">
        <svg viewBox="0 0 24 24">
          <path :d="mdiMenu" />
        </svg>
      </button>
    </div>
    <nav id="nav-body" :class="{ hide: hideMenu }">
      <ul id="root-list">
        <li><router-link class="nav-link" to="/">Home</router-link></li>
        <li>
          <router-link class="nav-link" to="/ittilia"
            >Explore Ittilia</router-link
          >
          <ul>
            <li>
              <router-link class="nav-link" to="/ittilia/book"
                >├ Book</router-link
              >
            </li>
            <li>
              <router-link class="nav-link" to="/ittilia/map"
                >├ Map</router-link
              >
            </li>
            <li>
              <router-link class="nav-link" to="/ittilia/classes"
                >└ Classes</router-link
              >
            </li>
          </ul>
        </li>
        <li>
          <router-link class="nav-link" to="/tools">Tools</router-link>
          <ul>
            <li>
              <router-link class="nav-link" to="/tools/book"
                >├ Item Forge</router-link
              >
            </li>
            <li>
              <router-link class="nav-link" to="/tools/map"
                >├ Initiative Tracker</router-link
              >
            </li>
            <li>
              <router-link class="nav-link" to="/tools/classes"
                >└ Character Sheets</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div id="view-head">
      <slot name="header"></slot>
    </div>
    <div id="view-body">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiMenu } from "@mdi/js";

@Component
export default class ViewRoot extends Vue {
  private mdiMenu: string = mdiMenu;
  private hideMenu = true;

  toggleHide(): void {
    this.hideMenu = !this.hideMenu;
  }
}
</script>

<style lang="scss">
#view-root {
  $head-height: 64px;
  $nav-width: 256px;
  $threshold: 1052px;

  height: 100%;

  display: grid;
  grid-template-areas:
    "nav-head header"
    "nav-body main";
  grid-template-rows: $head-height auto;
  grid-template-columns: $nav-width auto;

  @media screen and (max-width: $threshold) {
    grid-template-areas:
      "nav-head header"
      //"nav-body nav-body"
      "main main";
    grid-template-rows: $head-height auto;
    grid-template-columns: $head-height auto;
  }

  #view-head {
    width: 100%;
  }

  #nav-head {
    grid-area: nav-head;
    background-color: #080016;
    border-bottom: 1px solid #ababab;

    @media screen and (max-width: $threshold) {
      background: white;
    }

    #nav-toggle {
      box-sizing: border-box;
      width: 48px;
      height: 48px;

      padding: 4px;

      display: none;

      svg {
        width: 100%;
        height: 100%;
      }

      @media screen and (max-width: $threshold) {
        display: inline-block;
      }
    }
  }

  #nav-body {
    grid-area: nav-body;
    background-color: #080016;

    color: white;

    padding: 16px;

    box-sizing: border-box;

    @media screen and (max-width: $threshold) {
      transition: height 1s;

      position: fixed;
      top: $head-height;
      width: 100%;

      &.hide {
        height: 0px;
        overflow: hidden;
        padding: 0px;
        display: none;
      }
    }

    ul {
      list-style-type: none;
      padding-left: 16px;
    }

    #root-list {
      padding: 0px;

      li {
        text-align: start;
        padding: 4px 0px;

        .nav-link {
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }

  #view-body {
    grid-area: main;
    height: 100%;
    overflow-y: scroll;
  }
}

@media print {
  // When printing show only the main area and hide the rest
  #view-root {
    grid-template-areas: "main";

    grid-template-rows: auto;
    grid-template-columns: auto;

    #nav-head,
    #nav-body {
      display: none;
    }

    #view-body {
      overflow-y: visible;
    }
  }
}
</style>
