<template>
  <nav>
    <router-link v-if="backTarget != null" id="back-link" :to="backTarget">
      Terug</router-link
    >
    <div>
      <router-link class="wiki-nav-link" to="/wiki/cities">Steden</router-link>
      <router-link class="wiki-nav-link" to="/wiki/geopolitics"
        >Geopolitiek</router-link
      >
      <router-link class="wiki-nav-link" to="/wiki/people"
        >Personen</router-link
      >
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class WikiNav extends Vue {
  @Prop(Object) private readonly backTarget!: string;
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colours.scss";
nav {
  border: 1px solid $border;
  border-radius: 8px;

  padding: 8px;
  margin: 8px auto;
  width: calc(100% - 32px);
  max-width: 700px;

  text-align: start;

  #back-link {
    color: $accent;
    font-weight: bold;
    margin-bottom: 8px;
  }

  div .wiki-nav-link {
    display: block;
    color: grey;

    text-decoration: none;
    font-weight: bold;

    padding: 4px 8px;

    &:hover {
      background-color: $accent-40;
    }

    &.router-link-active {
      color: $accent;
    }
  }
}
</style>
