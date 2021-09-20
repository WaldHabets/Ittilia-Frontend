<template>
  <view-root>
    <template v-slot:header>
      <view-header>
        <template v-slot:start>
          <label for="file-open" class="button">{{
            s.get("action-import")
          }}</label>
          <input
            id="file-open"
            type="file"
            v-on:change="open"
            style="display: none"
          />
        </template>
        <template v-slot:end>
          <input
            id="meta-groupname"
            type="text"
            v-model="model.name"
            :placeholder="s.get('groupname')"
            class="text-input"
          />
          <button id="meta-save" class="button" @click="save">
            <svg viewBox="0 0 24 24" fill="white">
              <path :d="mdiContentSave" />
            </svg>
          </button>
        </template>
      </view-header>
    </template>
    <template v-slot:content>
      <main>
        <div id="controls" class="card">
          <button class="button" @click="sort">
            <svg viewBox="0 0 24 24">
              <path :d="mdiSortDescending" />
            </svg>
          </button>
          <button class="button" @click="prevTurn">
            <svg viewBox="0 0 24 24">
              <path :d="mdiArrowPrev" />
            </svg>
          </button>
          <div class="control-indicator">
            <div class="control-indicator-label">{{ s.get("round") }}</div>
            <div class="control-indicator-value">{{ model.round }}</div>
          </div>
          <div class="control-indicator">
            <div class="control-indicator-label">{{ s.get("turn") }}</div>
            <div class="control-indicator-value">{{ model.turn }}</div>
          </div>
          <button class="button" @click="nextTurn">
            <svg viewBox="0 0 24 24">
              <path :d="mdiArrowNext" />
            </svg>
          </button>
          <div id="meta" class="card">
            <div id="meta-xp">
              <span>{{ s.get("monster-xp") }}: </span
              ><span>{{ monsterxp }}</span>
            </div>
            <div id="meta-difficulty">
              <span>{{ s.get("difficulty") }}: </span>
              <span
                v-if="difficulty === 0"
                style="font-weight: 600; color: #5a9216"
                >{{ s.get("easy") }}</span
              >
              <span
                v-if="difficulty === 1"
                style="font-weight: 600; color: #45baef"
                >{{ s.get("medium") }}</span
              >
              <span
                v-if="difficulty === 2"
                style="font-weight: 600; color: #f9a825"
                >{{ s.get("hard") }}</span
              >
              <span
                v-if="difficulty === 3"
                style="font-weight: 600; color: #760000"
                >{{ s.get("deadly") }}</span
              >
            </div>
          </div>
        </div>
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
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import Side from "@/components/view/Side.vue";

import {
  mdiArrowRightBold,
  mdiArrowLeftBold,
  mdiSortDescending,
  mdiContentSave,
} from "@mdi/js";

import InitiativeCard from "@/components/combat-tracker/InitiativeCard.vue";
import CreateCombatEntry from "@/components/combat-tracker/CreateCombatEntry.vue";
import PartyList from "@/components/combat-tracker/PartyList.vue";

import CombatEntry from "@/models/CombatEntry";
import Strings from "@/helpers/Strings.ts";

class Model {
  name = "";
  description = "";
  entries: CombatEntry[] = [];
  round = 0;
  turn = 0;
}

@Component({
  components: {
    ViewRoot,
    ViewHeader,
    InitiativeCard,
    CreateCombatEntry,
    Side,
    PartyList,
  },
})
export default class InitiativeTracker extends Vue {
  private readonly s: Strings = new Strings();
  private readonly mdiArrowPrev: string = mdiArrowLeftBold;
  private readonly mdiArrowNext: string = mdiArrowRightBold;
  private readonly mdiSortDescending: string = mdiSortDescending;
  private readonly mdiContentSave: string = mdiContentSave;

  private model: Model = new Model();
  private thresholds = require("@/assets/data/thresholds.json");

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

    console.log(thres);
    console.log(xp);

    const closest = thres.reduce((a, b) => {
      return Math.abs(b - xp) < Math.abs(a - xp) ? b : a;
    });

    console.log(closest);

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
    console.log(index);
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
}
</script>

<style lang="scss">
@import "../../scss/buttons.css";
@import "../../scss/inputs.css";

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

  #controls {
    display: flex;
    justify-content: space-around;
    align-items: center;

    box-sizing: border-box;
    height: $height-controls;

    margin: auto;
    max-width: 700px;

    box-shadow: 0px 12px 16px -16px rgba(0, 0, 0, 0.7);

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

  #initiative-view {
    padding: 16px 16px 16px 16px;

    box-sizing: border-box;
    height: 100%;
    max-height: calc(100% - #{$height-controls});
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
