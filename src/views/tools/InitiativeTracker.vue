<template>
  <view-root>
    <template v-slot:header>
      <view-header>
        <template v-slot:start>
          <import-button @change="open" />
        </template>
        <template v-slot:end>
          <input
            id="meta-groupname"
            type="text"
            v-model="model.name"
            :placeholder="s.get('groupname')"
            class="text-input"
          />
          <button id="meta-save" class="button" title="Opslaan" @click="save">
            <svg viewBox="0 0 24 24" fill="white">
              <path :d="mdiContentSave" />
            </svg>
          </button>
        </template>
      </view-header>
    </template>
    <template v-slot:content>
      <main>
        <header>
          <div id="controls" class="card">
            <button class="flat-button" :title="$text('action-clear')" @click="clear">
              <svg viewBox="0 0 24 24">
                <path :d="mdiDeleteOutline"/>
              </svg>
            </button>
            <button class="button" title="Sorteer" @click="sort">
              <svg viewBox="0 0 24 24">
                <path :d="mdiSortDescending" />
              </svg>
            </button>
            <button
              class="button"
              title="Check Moraal"
              @click="checkMoraleForEnemies"
            >
              <svg viewBox="0 0 24 24">
                <path :d="mdiAlert" />
              </svg>
            </button>
            <button class="button" title="Vorige Beurt" @click="prevTurn">
              <svg viewBox="0 0 24 24">
                <path :d="mdiArrowPrev" />
              </svg>
            </button>
            <div class="control-indicator">
              <div class="control-indicator-label">{{ $text("round") }}</div>
              <div class="control-indicator-value">{{ model.round }}</div>
            </div>
            <div class="control-indicator">
              <div class="control-indicator-label">{{ $text("turn") }}</div>
              <div class="control-indicator-value">{{ model.turn }}</div>
            </div>
            <button class="button" title="Volgende Beurt" @click="nextTurn">
              <svg viewBox="0 0 24 24">
                <path :d="mdiArrowNext" />
              </svg>
            </button>
            <div id="meta" class="card">
              <div id="meta-xp">
                <span>{{ $text("monster-xp") }}: </span
                ><span>{{ monsterxp }}</span>
              </div>
              <div id="meta-difficulty">
                <span>{{ $text("difficulty") }}: </span>
                <span
                  v-if="difficulty === 0"
                  style="font-weight: 600; color: #5a9216"
                  >{{ $text("easy") }}</span
                >
                <span
                  v-if="difficulty === 1"
                  style="font-weight: 600; color: #45baef"
                  >{{ $text("medium") }}</span
                >
                <span
                  v-if="difficulty === 2"
                  style="font-weight: 600; color: #f9a825"
                  >{{ $text("hard") }}</span
                >
                <span
                  v-if="difficulty === 3"
                  style="font-weight: 600; color: #760000"
                  >{{ $text("deadly") }}</span
                >
              </div>
            </div>
          </div>
          <progress id="hp-balance" :max="totalEntriesHP" :value="friendlyEntriesHP"></progress>
        </header>
        <div id="initiative-view">
          <div id="initiative-card-wrapper">
            <InitiativeCard
              v-bind:key="index"
              v-for="(entry, index) in model.entries"
              :model="entry"
              v-on:delete="deleteEntry(index)"
              v-bind:class="{ active: model.turn === index }"
            >
            </InitiativeCard>
          </div>
        </div>
      </main>
      <side>
        <template v-slot:content>
          <div id="description-view" class="card">
            <textarea
              class="text-input"
              placeholder="Notes"
              v-model="model.description"
            ></textarea>
          </div>
          <create-combat-entry @add="addEntry"></create-combat-entry>
          <party-list @add="addPlayers" />
        </template>
      </side>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import Side from "@/components/view/Side.vue";

import {
  mdiArrowRightBold,
  mdiArrowLeftBold,
  mdiSortDescending,
  mdiContentSave,
  mdiAlert,
  mdiDeleteOutline
} from "@mdi/js";

import InitiativeCard from "@/components/combat-tracker/InitiativeCard.vue";
import CreateCombatEntry from "@/components/combat-tracker/CreateCombatEntry.vue";
import PartyList from "@/components/combat-tracker/PartyList.vue";

import CombatEntry from "@/models/CombatEntry";
import Strings from "@/helpers/Strings.ts";
import DiceHelper from "@/helpers/DiceHelper.ts";

import ImportButton from "@/components/controls/ImportButton.vue";

class Model {
  name = "";
  description = "";
  entries: CombatEntry[] = [];
  round = 0;
  turn = 0;
}

function checkMorale(entry: CombatEntry): boolean {
  let roll = DiceHelper.rollMultiple(6, 2);
  return roll <= entry.mr;
}

@Component({
  components: {
    ViewRoot,
    ViewHeader,
    InitiativeCard,
    CreateCombatEntry,
    Side,
    PartyList,
    ImportButton,
  },
})
export default class InitiativeTracker extends Vue {
  private readonly s: Strings = new Strings();
  private readonly mdiAlert: string = mdiAlert;
  private readonly mdiArrowPrev: string = mdiArrowLeftBold;
  private readonly mdiArrowNext: string = mdiArrowRightBold;
  private readonly mdiSortDescending: string = mdiSortDescending;
  private readonly mdiContentSave: string = mdiContentSave;
  private readonly mdiDeleteOutline: string = mdiDeleteOutline;

  private model: Model = new Model();
  private thresholds = require("@/assets/data/thresholds.json");

  private totalEntriesHP = 0;
  private friendlyEntriesHP = 0;

  @Watch("model.entries", {immediate: true, deep: true})
  recalculateEntriesHP(newEntries: CombatEntry[], oldEntries: CombatEntry[]): void {
    let sumTotal = 0;
    let sumFriendly = 0
    this.model.entries.forEach((entry: CombatEntry) => {
      sumTotal += entry.curent_hp;
      sumFriendly += (entry.allegiance == "enemy") ? 0 : entry.curent_hp;
    });
    this.totalEntriesHP = sumTotal;
    this.friendlyEntriesHP = sumFriendly;
    console.log(sumTotal);
    console.log(sumFriendly);
  }

  get monsterxp(): number {
    let enemies = 0;
    let totalxp = 0;
    this.model.entries.forEach((entry: CombatEntry) => {
      if (entry.allegiance == "enemy") {
        enemies++;

        totalxp += typeof entry.xp === "string" ? parseInt(entry.xp) : entry.xp;
      }
    });

    if (enemies > 15) {
      totalxp *= 4;
    } else if (enemies > 10) {
      totalxp *= 3;
    } else if (enemies > 6) {
      totalxp *= 2.5;
    } else if (enemies > 2) {
      totalxp *= 2;
    } else if (enemies > 1) {
      totalxp *= 1.5;
    }

    return totalxp;
  }

  get difficulty(): number {
    var thres = this.calcThresholds();
    var xp = this.monsterxp;

    const closest = thres.reduce((a, b) => {
      return Math.abs(b - xp) < Math.abs(a - xp) ? b : a;
    });

    return thres.indexOf(closest);
  }

  open(input: Event): void {
    const target = input.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    const fileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.onload = (_) => {
      let json: string = fileReader.result as string;
      let obj = JSON.parse(json);

      this.model.name = obj.name;
      this.model.description = obj.description;
      this.model.entries = obj.entries;
    };
  }

  save(): void {
    var saveJson = JSON.stringify(this.model, null, 4);
    const blob = new Blob([saveJson], { type: "text/plain" });
    const a = document.createElement("a");
    a.download = this.model.name + ".json";
    a.href = URL.createObjectURL(blob);
    a.click();
  }

  clear(): void {
    this.model.entries.length = 0;
    this.model.entries = [];
    this.model.round = 0;
    this.model.turn = 0;
  }

  calcThresholds(): number[] {
    var calculated = [0, 0, 0, 0];

    this.model.entries.forEach((entry: CombatEntry) => {
      if (entry.allegiance == "player") {
        calculated[0] += this.thresholds[entry.xp - 1][0]; // easy
        calculated[1] += this.thresholds[entry.xp - 1][1]; // medium
        calculated[2] += this.thresholds[entry.xp - 1][2]; // hard
        calculated[3] += this.thresholds[entry.xp - 1][3]; // deadly
      }
      if (entry.allegiance == "ally") {
        let xp = Math.floor(entry.xp / 4);
        calculated[0] += xp;
        calculated[1] += xp;
        calculated[2] += xp;
        calculated[3] += xp;
      }
    });

    return calculated;
  }

  addEntry(entry: CombatEntry): void {
    this.model.entries.push(entry);
  }

  addPlayers(players: CombatEntry[]) {
    this.model.entries.push(...players);
  }

  deleteEntry(index: number): void {
    this.model.entries.splice(index, 1);
  }

  nextTurn(): void {
    this.model.turn++;
    if (this.model.turn === this.model.entries.length) {
      this.model.turn = 0;
      this.model.round++;
    }
  }

  prevTurn(): void {
    this.model.turn--;
    if (this.model.turn < 0) {
      this.model.turn = this.model.entries.length - 1;
      this.model.round--;
    }
  }

  sort(): void {
    this.model.entries.sort(function (a: CombatEntry, b: CombatEntry) {
      return b.initiative - a.initiative;
    });
  }

  checkMoraleForEnemies(): void {
    this.model.entries.forEach((entry: CombatEntry) => {
      if (entry.allegiance == "enemy" && !checkMorale(entry)) {
        entry.isFleeing = true;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/inputs.css";

@import "./InitiativeTracker.styles/description-view.scss";

$height-header: 70px;
$height-controls: 56px;

#meta-groupname {
  margin-right: 8px;
}

#meta-save {
  width: 41px;
  height: 41px;
}

main {
  height: 100%;
  max-height: 100%;

  header {
    margin: auto;
    max-width: 700px;
    box-shadow: 0px 12px 16px -16px rgba(0, 0, 0, 0.7);
    #controls {
      display: flex;
      justify-content: space-around;
      align-items: center;

      box-sizing: border-box;
      height: $height-controls;

      button {
        height: 48px;
        width: 48px;
        margin: 0px 8px;
        font-weight: 700;
        vertical-align: middle;

        svg {
          fill: currentColor;
        }
      }
      .control-indicator {
        display: inline-flex;
        flex-direction: column;
        height: 48px;
        width: 48px;
        margin: 0px 8px;
        text-align: center;
        justify-content: center;
        text-transform: uppercase;
        .control-indicator-value {
          font-size: x-large;
        }
      }

      #meta {
        text-align: start;
        #meta-xp,
        #meta-difficulty {
          height: inherit;
          box-sizing: border-box;
        }
      }
    }
    #hp-balance {
      display: block;
      appearance: none;
      color: green;
      background-color: red;
      width: 100%;
      height: 10px;
      border: none;
      margin: 0px;
      &[value]::-webkit-progress-bar {
        background-color: green;
      }
      &[value]::-webkit-progress-value {
        background-color: green;
      }
      &[value]::-moz-progress-bar {
        background-color: green;
      }
    }
  }

  #initiative-view {
    padding: 16px 16px 16px 16px;

    box-sizing: border-box;
    height: 100%;
    max-height: calc(100% - #{$height-controls} - 10px);
    overflow-y: scroll;
    #initiative-card-wrapper {
      margin: auto;
    }
  }
}

#side {
  textarea {
    width: 100%;
    resize: vertical;
  }
}

.active {
  border-left: 4px solid blue;
}
</style>
