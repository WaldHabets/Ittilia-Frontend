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
    <span class="cg-result-combination">{{ combination }}</span>
    <span class="cg-result-dc">{{ dc }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DiceHelper from "@/helpers/DiceHelper.ts";

@Component
export default class CombinationGenerator extends Vue {
  private difficulty = 3;
  private combination = "";
  private dc = 10;

  private readonly options: string[] = ["T", "D", "K"];

  generate() {
    this.combination = "";
    let steps: string[] = [];
    for (let i = 0; i < this.difficulty; ++i) {
      steps.push(this.options[DiceHelper.roll(3) - 1]);
    }
    this.combination = steps.join("∙");
    this.dc = 10 + 2 * this.difficulty;
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
