<template>
  <header>
    <div id="header-content">
      <h1>{{ metadata.name }}</h1>
      <p>
        Type: <span>{{ metadata.type }}</span>
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GeographyMetadata from "@/models/GeographyMetadata";

@Component
export default class GeographyHeader extends Vue {
  @Prop(Object) private readonly metadata!: GeographyMetadata;
}
</script>

<style lang="scss" scoped>
@import "header.scss";
header {
  @include header();
}
</style>
