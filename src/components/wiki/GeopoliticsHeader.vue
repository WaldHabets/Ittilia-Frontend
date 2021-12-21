<template>
  <header id="geopolitical-header">
    <div id="header-content">
      <div>
        <h1>{{ metadata.name }}</h1>
        <p>
          Inwoners:
          <span>{{ metadata.population }}</span>
        </p>
      </div>
      <img
        v-if="metadata.banner != ''"
        :src="`/static/img/wiki/${metadata.banner}`"
        :alt="`Bannier van ${metadata.name}`"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GeopoliticsMetadata from "@/models/GeopoliticsMetadata.ts";

@Component
export default class GeopoliticsHeader extends Vue {
  @Prop(Object) private readonly metadata!: GeopoliticsMetadata;
}
</script>

<style lang="scss" scoped>
@import "header.scss";
header {
  @include header();
  #header-content {
    display: flex;
    align-items: flex-start;

    div {
      @include header();
      flex-grow: 1;
    }
    img {
      width: 100px;
    }
  }
}
</style>
