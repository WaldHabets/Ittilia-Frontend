<template>
  <header>
    <h1>{{ metadata.name }}</h1>
    <p>
      Soort: <span>{{ metadata.species }}</span> ● Sex:
      <span>{{ metadata.sex }}</span> ● Leeftijd:
      <span>{{ metadata.age }}</span>
    </p>
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
