<template>
  <header>
    <div id="header-content">
      <h1>{{ metadata.name }}</h1>
      <p>
        {{ $text("country") }}: <span>{{ metadata.country }}</span> ●
        {{ $text("inhabitants") }}: <span>{{ metadata.population }}</span> ●
        Aeréankristal:
        <span>{{ metadata.cristal }}</span>
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CityMetadata from "@/models/CityMetadata.ts";

@Component
export default class CityHeader extends Vue {
  @Prop(Object) private readonly metadata!: CityMetadata;
}
</script>

<style lang="scss" scoped>
@import "header.scss";
header {
  @include header();
}
</style>
