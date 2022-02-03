<template>
  <header>
    <div id="header-content">
      <h1>{{ metadata.name }}</h1>
      <p>
        {{ $text("lineage") }}: <span>{{ metadata.species }}</span> ●
        {{ $text("sex") }}: <span>{{ metadata.sex }}</span> ●
        {{ $text("age") }}:
        <span>{{ metadata.age }}</span>
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PeopleMetadata from "@/models/PeopleMetadata.ts";

@Component
export default class PeopleHeader extends Vue {
  @Prop(Object) private readonly metadata!: PeopleMetadata;
}
</script>

<style lang="scss" scoped>
@import "header.scss";
header {
  @include header();
}
</style>
