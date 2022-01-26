<template>
  <div class="combination-generator">
    <select v-model="difficulty">
      <option :value="3">Zeer gemakkelijk</option>
      <option :value="5">Gemakkelijk</option>
      <option :value="7">Matig</option>
      <option :value="9">Moeilijk</option>
      <option :value="11">Zeer moeilijk</option>
    </select>
    <button @click="generate" class="button">Create</button>
    <template v-if="combination">
      <span class="cg-result-combination">{{ combination.combination }}</span>
      <span class="cg-result-dc">{{ combination.dc }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Combination, generateCombination } from "@/helpers/Combination";

@Component
export default class CombinationGenerator extends Vue {
  private difficulty = 3;

  private combination: Combination | null = null;

  generate(): void {
    this.combination = generateCombination(this.difficulty);
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/colours.scss";
@import "../../assets/scss/dims.scss";
@import "../../assets/scss/buttons.css";
.combination-generator {
  padding: $small;
  *:not(:last-child) {
    margin-right: $small;
  }
  select {
    border: 1px solid #b0bec5;
    border-radius: 4px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.7);

    padding: $small;

    &:focus {
      outline: none;
      border-width: 2px;
      border-color: grey;
      padding: 7px;
    }
  }
  span {
    display: inline-block;

    color: $accent;
    background-color: #eeeeee;
    padding: $tiny $small;
    border: 1px solid #cccccc;
    border-radius: 4px;

    &.cg-result-combination {
      width: 11em;
    }
    &.cg-result-dc {
      width: 2em;
    }
  }
}
</style>
