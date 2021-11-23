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

$image-height: 128px;
$text-block-height: math.div($image-height, 2);

$box-height: 128px;
$box-width: 340px;

@mixin box-part() {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
}

.portal-card {
  display: inline-block;
  position: relative;
  width: $box-width;
  height: $box-height;
  margin: 8px;

  border: 1px solid #ababab;

  box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.7);

  text-decoration: none;

  font-size: 18px;
  font-weight: 800;

  background-color: #061826;

  overflow: hidden;

  img {
    @include box-part();
    object-fit: cover;
    object-position: 50%;
    height: $box-height;

    transition: transform ease-in-out 300ms;

    &:hover {
      transform: scale(1.2);
    }
  }
  h1 {
    @include box-part();
    position: absolute;
    bottom: 0;

    pointer-events: none;

    height: math.div($box-height, 3);
    //background-color: #3685b5;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    line-height: math.div($box-height, 3);
  }
  @media screen and (max-width: $box-width + 16px) {
    & {
      width: calc(100% - 16px);
    }
  }
}
</style>
