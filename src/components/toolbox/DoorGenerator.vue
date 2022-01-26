<template>
  <div class="door-generator">
    <button @click="generate" class="button">Create</button>
    <div class="dg-result">
      <template v-if="door">
        <h1>
          <span v-if="door.reinforced"> {{ $text("door-reinforced") }} </span
          >{{ $text(door.material) }} (AC: {{ door.ac }} - HP: {{ door.hp }})
        </h1>
        <p v-if="door.locked">
          {{ $text("door-locked") }}: {{ door.lockCombination.combination }}
        </p>
        <p v-if="door.secret">
          {{ $text("door-secret") }}: DC{{ door.secretDC }}
        </p>
        <p v-if="door.stuck">{{ $text("door-stuck") }}</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Door, generateDoor } from "@/helpers/Door";

@Component
export default class CombinationGenerator extends Vue {
  private door: Door | null = null;

  generate(): void {
    this.door = generateDoor();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colours.scss";
@import "../../assets/scss/dims.scss";
@import "../../assets/scss/buttons.css";
.door-generator {
  .dg-result {
    background-color: #eeeeee;
    padding: $tiny $small;
    border: 1px solid #cccccc;
    border-radius: 4px;
    text-align: start;

    max-width: 300px;

    h1 {
      color: $accent;
      font-size: 18px;
    }
    p {
      font-size: 14px;
      margin: 0;
    }
  }
}
</style>
