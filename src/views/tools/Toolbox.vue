<template>
  <div>
    <combination-generator />
    <mon-gen />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CombinationGenerator from "@/components/toolbox/CombinationGenerator.vue";

import MonGen from "@/components/mongen/MonGen.vue";

@Component({
  components: {
    CombinationGenerator,
    MonGen,
  },
})
export default class Toolbox extends Vue {}
</script>

<style lang="scss"></style>
