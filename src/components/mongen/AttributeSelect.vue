<template>
  <select v-model="attribute">
    <option
      v-for="(item, index) in list"
      :key="`attribute-select-${index}`"
      :value="item"
    >
      {{ item.text }} ({{ item.value }})
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import AttributeData from "./AttributeData";

@Component
export default class AttributeSelect extends Vue {
  private attributeList: AttributeData[] = require("@/assets/data/attributes.json");
  private attribute: AttributeData = this.attributeList[0];

  @Prop(Number) private readonly max!: number;

  get list(): AttributeData[] {
    return this.attributeList.filter((att: AttributeData) => {
      return att.value <= this.max;
    });
  }

  @Watch("attribute")
  onAttributeChange(): void {
    this.$emit("change", this.attribute);
  }

  mounted(): void {
    this.$emit("change", this.attribute);
  }
}
</script>
