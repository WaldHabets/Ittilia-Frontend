<template>
  <span>
    {{ string }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import strings from "@/assets/strings.json";

@Component
export default class String extends Vue {
  @Prop() private readonly tag!: string;

  get string(): string {
    return strings[this.tag][this.$store.state.language];
  }
}
</script>
