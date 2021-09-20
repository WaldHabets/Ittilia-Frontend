<template>
  <section v-html="html"></section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import marked from "marked";
import DOMpurify from "dompurify";

@Component
export default class Markdown extends Vue {
  @Prop() private readonly src!: string;

  get html(): string {
    let dirty = marked(this.src);
    return DOMpurify.sanitize(dirty);
  }
}
</script>
