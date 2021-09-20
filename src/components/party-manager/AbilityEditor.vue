<template>
  <div class="ability">
    <label :for="`ability-${label}`">{{ label }}</label
    ><input
      :name="`ability-${label}`"
      type="number"
      min="0"
      max="30"
      v-model="value"
      class="text-input-v"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AbilityEditor extends Vue {
  @Prop() private readonly label!: string;
  @Prop() private readonly modelValue!: number;

  get value(): number {
    return this.modelValue;
  }
  set value(v: number) {
    this.$emit("update:modelValue", v);
  }
}
</script>

<style lang="scss">
@use "sass:math";
@import "../../scss/inputs.css";
.ability {
  $circle-dim: 42px;
  text-align: start;

  display: flex;
  align-items: center;
  flex-direction: row;

  margin: 8px;
  box-sizing: border-box;
  width: 160px;

  label {
    display: block;
    box-sizing: border-box;
    border: 1px solid #b0bec5;
    border-radius: 4px 0px 0px 4px;
    width: 144 - math.div($circle-dim, 2);
    padding: 4px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input {
    position: relative;
    left: math.div(-$circle-dim, 2);

    display: block;
    border: 2px solid #b0bec5;
    border-radius: 50%;

    background-color: white;

    box-sizing: border-box;
    width: $circle-dim;
    height: $circle-dim;
    line-height: $circle-dim;
    font-size: 18px;
    font-weight: 800;

    text-align: center;
    -moz-appearance: textfield;
  }
}
</style>
