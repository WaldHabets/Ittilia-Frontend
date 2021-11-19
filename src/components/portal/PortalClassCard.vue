<template>
  <router-link :to="href" class="portal-class-card">
    <span>
      {{ text }}
    </span>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PortalClassCard extends Vue {
  @Prop(String) private readonly text!: string;
  @Prop(String) private readonly href!: string;
  @Prop(String) private background: string | undefined;
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/buttons.scss";

.portal-class-card {
  @include button(#7f2aff);
  $height: 24px;

  display: inline-block;

  height: $height;
  line-height: $height;

  margin: 4px;

  color: white;

  span {
    // box-sizing: border-box;
    // background: rgba(255, 255, 255, 0.7);
    // padding: 4px 8px;
    // width: 100%;
    // height: 16px;
    // border-radius: 4px;
    // box-shadow: inset 0px 2px 8px -1px rgba(0, 0, 0, 0.7);
    // color: #4a4a4a;
  }
}
</style>
