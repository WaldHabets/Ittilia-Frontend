<template>
  <div class="initiative-card">
    <div class="general">
      <h1 v-bind:class="[model.dead ? 'dead' : model.allegiance]">
        {{ model.name }}
      </h1>
      <div>
        <span class="attribute-name">Init: </span
        ><span class="attribute-value">{{ model.initiative }}</span>
        <span class="attribute-name">AC: </span
        ><span class="attribute-value">{{ model.ac }}</span>

        <template v-if="model.allegiance != 'player'">
          <span class="attribute-name">MR: </span>
          <span class="attribute-value">{{ model.mr }}</span>
        </template>

        <span class="attribute-name" v-if="model.allegiance != 'player'"
          >XP:
        </span>
        <span class="attribute-name" v-else>Level: </span>
        <span class="attribute-value">{{ model.xp }}</span>

        <span class="attribute-name">PP: </span
        ><span class="attribute-value">{{ model.pp }}</span>
      </div>
    </div>
    <div class="health" v-bind:style="{ color: damage }">
      <input class="health-box" v-model="model.curent_hp" />
      <span class="health-box">{{ model.maximum_hp }}</span>
    </div>
    <div class="actions">
      <button class="flat-button" @click="model.dead = !model.dead">
        <svg viewBox="0 0 24 24">
          <path :d="mdiSkull" />
        </svg>
      </button>
      <button class="button-red" @click="deleteThis">
        <svg viewBox="0 0 24 24">
          <path :d="mdiDelete" />
        </svg>
      </button>
    </div>
    <textarea
      class="notes text-input"
      placeholder="Notes"
      v-model="model.notes"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
import { mdiDelete, mdiSkull } from "@mdi/js";
import CombatEntry from "@/models/CombatEntry";

@Component
export default class InitiativeCard extends Vue {
  private mdiDelete: string = mdiDelete;
  private mdiSkull: string = mdiSkull;

  @Model("change", { type: Object }) readonly model!: CombatEntry;

  get damage() {
    var ratio = this.model.curent_hp / this.model.maximum_hp;
    if (ratio <= 0.05) {
      return "#760000";
    } else if (ratio <= 0.15) {
      return "#ac1900";
    } else if (ratio <= 0.3) {
      return "#e65100";
    } else if (ratio <= 0.5) {
      return "#f9a825";
    } else {
      return "#5a9216";
    }
  }

  deleteThis(): void {
    this.$emit("delete");
  }
}
</script>

<style lang="scss">
@import "../../scss/buttons.css";

$color-player: #4cc552; // Kelly Green
$color-enemy: #f70d1a; // Ferrari Red
$color-ally: #1589ff; // Dodger Blue

$boxed-element-height: 36px;

.dead {
  text-decoration: line-through;
  //color: $color-danger;
}

.player {
  color: $color-player;
}

.enemy {
  color: $color-enemy;
}

.ally {
  color: $color-ally;
}

.initiative-card {
  box-sizing: border-box;

  width: 100%;
  max-width: 700px;

  border: 1px solid #ababab;
  border-radius: 0px;

  margin: auto;
  margin-bottom: 8px;

  display: grid;
  grid-template:
    "number general health actions"
    "number notes notes notes"
    / 52px auto 176px 96px;

  align-items: center;

  .general {
    grid-area: general;

    box-sizing: border-box;
    height: 100%;

    text-align: start;
    padding: 4px 8px;

    h1 {
      font-weight: bold;
      font-size: large;
      width: 100%;
      margin-top: 0px;
      margin-bottom: 4px;
    }

    div {
      display: flex;
      align-items: center;

      span {
        font-size: small;
      }

      .attribute-name {
        margin-right: 4px;
        font-weight: 600;
      }

      .attribute-value {
        margin-right: 16px;
      }
    }
  }

  .health {
    grid-area: health;

    justify-content: center;
    align-items: center;

    font-size: x-large;
    font-weight: bold;

    padding-left: 8px;
    padding-right: 8px;

    .health-box {
      display: inline-block;

      box-sizing: border-box;
      width: 70px;
      height: $boxed-element-height;

      border-style: solid;
      border-color: #ababab;

      text-align: center;
      font-size: inherit;
      font-weight: inherit;
    }

    input {
      border-width: 1px 0px 1px 1px;
      border-radius: 8px 0px 0px 8px;
    }
    span {
      border-width: 1px 1px 1px 0px;
      border-radius: 0px 8px 8px 0px;
      background-color: #e9e9ed;
    }
  }

  .notes {
    grid-area: notes;

    border: none;
    border-top: 1px solid #ababab;
    padding: 8px;
    min-height: $boxed-element-height;
    font-size: 14px;
    resize: vertical;
    margin: 0px;
  }

  .actions {
    grid-area: actions;

    button {
      display: inline-block;
      width: 36px;
      height: 36px;

      svg {
        fill: currentColor;
      }
    }
  }
}
</style>
