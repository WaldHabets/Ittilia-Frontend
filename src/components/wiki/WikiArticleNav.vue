<template>
  <nav id="wiki-article-nav">
    <router-link id="back-button" :to="backTarget">{{
      s.get("action-back")
    }}</router-link>
    <select @change="goTo($event)">
      <option value="cities">
        <router-link class="wiki-nav-link" to="/wiki/cities"
          >Steden</router-link
        >
      </option>
      <option value="geography">
        <router-link class="wiki-nav-link" to="/wiki/geography"
        >Geografie</router-link
        >
      </option>
      <option value="geopolitics">
        <router-link class="wiki-nav-link" to="/wiki/geopolitics"
          >Geopolitiek</router-link
        >
      </option>
      <option value="people">
        <router-link class="wiki-nav-link" to="/wiki/people"
          >Personen</router-link
        >
      </option>
    </select>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Strings from "@/helpers/Strings.ts";

@Component
export default class WikiArticleNav extends Vue {
  private readonly s: Strings = new Strings();

  @Prop(String) private readonly backTarget!: string;

  goTo(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.$router.push(`/wiki/${target.value}`);
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colours.scss";
@import "../../assets/scss/dims.scss";
#wiki-article-nav {
  display: none;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: $wiki-article-width;
  padding: 4px $wiki-article-padding;
  margin: auto;
  width: 100%;
  height: $wiki-article-nav-height;
  line-height: $wiki-article-nav-height;
  #back-button {
    color: $accent;
    font-weight: bold;
  }
  select {
    background: none;
    border: 1px solid $accent;
    border-radius: 4px;
    padding: 4px 8px;
    color: $accent;
  }
  @media screen and (max-width: $wiki-article-width-threshold) {
    & {
      display: flex;
      position: fixed;
      bottom: 0;
      background: white;
      border-top: 1px solid $border;
    }
  }

  @media print {
    & {
      display: none;
    }
  }
}
</style>
