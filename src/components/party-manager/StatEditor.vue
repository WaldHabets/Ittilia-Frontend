<template>
  <div class="stat">
    <!--
    <label :for="`stat-${label}`">{{ label }}</label>
    -->
    <div class="icon-wrapper">
      <svg viewBox="0 0 24 24" :fill="colour">
        <path :d="icon" />
      </svg>
    </div>
    <input type="number" min="0" v-model="value" class="text-input-v" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AbilityEditor extends Vue {
  @Prop() private readonly icon!: string;
  @Prop() private readonly colour!: string;
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
.stat {
  $circle-dim: 48px;
  $icon-dim: 24px;
  $width: 112px;
  $height: 72px;

  text-align: start;

  margin: 8px;
  box-sizing: border-box;
  width: min-content;
  height: 2 * $circle-dim;

  .icon-wrapper {
    height: $icon-dim + math.div($circle-dim, 2);
    width: $icon-dim;
    border: 1px solid #b0bec5;
    border-radius: 8px 8px 0px 0px;

    padding: 4px;
    margin: auto;
    svg {
      width: $icon-dim;
      height: $icon-dim;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input {
    position: relative;

    display: block;
    border: 2px solid #b0bec5;
    border-radius: 50%;
    margin: auto;
    top: math.div(-$circle-dim, 2);

    background-color: white;

    box-sizing: border-box;
    width: $circle-dim;
    height: $circle-dim;
    line-height: $circle-dim;
    font-size: 18px;
    font-weight: 800;

    text-align: center;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
