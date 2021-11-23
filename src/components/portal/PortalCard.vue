<template>
  <router-link :to="href" class="portal-card">
    <img :src="background" :alt="text" />
    <h1>{{ text }}</h1>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PortalCard extends Vue {
  @Prop(String) private readonly text!: string;
  @Prop(String) private readonly href!: string;
  @Prop(String) private readonly background!: string;
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "portal-constants.scss";

$box-height: 256px;
$box-width: 340px;

@mixin box-part() {
  display: block;
  width: 100%;
  height: math.div($box-height, 2);
  margin: 0;
  padding: 0;
  border: none;
}

.portal-card {
  display: inline-block;
  width: $box-width;
  height: $box-height;
  margin: 8px;

  border: 1px solid #ababab;

  box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.7);

  text-decoration: none;

  font-size: 18px;
  font-weight: 800;

  background-color: #061826;

  img {
    @include box-part();
    object-fit: cover;
    object-position: 50%;
  }
  h1 {
    @include box-part();

    //background-color: #3685b5;
    background-color: white;
    color: #061826;
    line-height: math.div($box-height, 4);
  }
  @media screen and (max-width: $box-width * 2 + 48px) {
    & {
      display: flex;
      width: calc(100% - 16px);
      height: math.div($box-height, 2);
    }
    img {
      display: inline-block;
      width: math.div($box-height, 2);
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>
