<template>
  <router-link :to="href" class="portal-card">
    <img />
    <h1>{{ text }}</h1>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PortalCard extends Vue {
  @Prop(String) private readonly text!: string;
  @Prop(String) private readonly href!: string;
  @Prop(String) private background: string | undefined;
}
</script>

<style lang="scss">
@import "portal-constants.scss";

.portal-card {
  $height: 300px;
  $banner-height: 48px;

  display: grid;
  grid-template-rows: $height - $banner-height $banner-height;

  width: $portal-card-width;
  height: $height;

  border: 1px solid #ababab;
  border-radius: 4px;

  box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.7);

  // line-height: $height;
  text-align: center;
  vertical-align: middle;

  text-decoration: none;

  font-size: 18px;
  font-weight: 800;

  background-color: #061826;

  img {
    width: 100%;
    display: block;
  }
  h1 {
    display: block;
    margin: 0px;
    background-color: #3685b5;
    color: #061826;
    line-height: $banner-height;
  }
}
</style>
