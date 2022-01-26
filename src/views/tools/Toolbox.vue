<template>
  <div>
    <combination-generator />
    <door-generator/>
    <mon-gen />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CombinationGenerator from "@/components/toolbox/CombinationGenerator.vue";

import MonGen from "@/components/mongen/MonGen.vue";
import DoorGenerator from "@/components/toolbox/DoorGenerator.vue";

@Component({
  components: {
    DoorGenerator,
    CombinationGenerator,
    MonGen,
  },
})
export default class Toolbox extends Vue {}
</script>

<style lang="scss"></style>
