<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>
    <template v-slot:content>
      <div id="combat-tracker">
        <main>
          <div id="tracker">
            <div id="controls" class="card">
              <button class="button" @click="sort">Sort</button>
              <button class="button" @click="prevTurn">
                <svg viewBox="0 0 24 24">
                  <path :d="mdiArrowPrev" />
                </svg>
              </button>
              <div class="control-indicator">
                <div class="control-indicator-label">Round</div>
                <div class="control-indicator-value">{{ model.round }}</div>
              </div>
              <div class="control-indicator">
                <div class="control-indicator-label">Turn</div>
                <div class="control-indicator-value">{{ model.turn }}</div>
              </div>
              <button class="button" @click="nextTurn">
                <svg viewBox="0 0 24 24">
                  <path :d="mdiArrowNext" />
                </svg>
              </button>
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
          </div>
          <div id="side">
            <div id="description-view" class="card">
              <input type="file" v-on:change="open" />
              <p>
                <span>Total Monster XP: </span><span>{{ monsterxp }}</span>
              </p>
              <p>
                <span>Difficulty: </span>
                <span
                  v-if="difficulty === 0"
                  style="font-weight: 600; color: #5a9216"
                  >Easy</span
                >
                <span
                  v-if="difficulty === 1"
                  style="font-weight: 600; color: #45baef"
                  >Medium</span
                >
                <span
                  v-if="difficulty === 2"
                  style="font-weight: 600; color: #f9a825"
                  >Hard</span
                >
                <span
                  v-if="difficulty === 3"
                  style="font-weight: 600; color: #760000"
                  >Deadly</span
                >
              </p>
              <textarea
                class="text-input"
                placeholder="Notes"
                v-model="model.description"
              ></textarea>
              <input type="text" v-model="model.name" placeholder="Name" />
              <input type="submit" value="Save" v-on:click="save" />
            </div>
            <create-combat-entry @add="addEntry"></create-combat-entry>
          </div>
        </main>
      </div>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";

import { mdiArrowRightBold, mdiArrowLeftBold } from "@mdi/js";

import InitiativeCard from "@/components/combat-tracker/InitiativeCard.vue";
import CreateCombatEntry from "@/components/combat-tracker/CreateCombatEntry.vue";

import CombatEntry from "@/models/CombatEntry";

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
  },
})
export default class InitiativeTracker extends Vue {
  private mdiArrowPrev: string = mdiArrowLeftBold;
  private mdiArrowNext: string = mdiArrowRightBold;

  private model: Model = new Model();
  private thresholds = require("@/assets/data/thresholds.json");

  get monsterxp(): number {
    let enemies = 0;
    let totalxp = 0;
    this.model.entries.forEach((entry: CombatEntry) => {
      if (entry.allegiance == "enemy") {
        enemies++;
        totalxp += parseInt(entry.xp);
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
    fileReader.onload = (event) => {
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
    const e = document.createEvent("MouseEvents");
    const a = document.createElement("a");
    a.download = this.model.name + ".json";
    a.href = URL.createObjectURL(blob);
    a.click();
  }

  calcThresholds(): number[] {
    var calculated = [0, 0, 0, 0];

    this.model.entries.forEach((entry: CombatEntry) => {
      if (entry.allegiance == "player") {
        calculated[0] += this.thresholds[entry.xp][0]; // easy
        calculated[1] += this.thresholds[entry.xp][1]; // medium
        calculated[2] += this.thresholds[entry.xp][2]; // hard
        calculated[3] += this.thresholds[entry.xp][3]; // deadly
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

$height-header: 70px;
$height-controls: 56px;

#controls {
  display: flex;
  justify-content: space-around;
  align-items: center;

  box-sizing: border-box;
  height: $height-controls;

  margin: auto;
  max-width: 700px;

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
}

#combat-tracker {
  // padding-top: $top-margin-height;
  max-height: 100vh;

  header {
    display: flex;
    // height: $height-header;
    padding: 16px;
    box-sizing: border-box;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    #tracker {
      flex: 1 1 auto;
      order: 1;

      #initiative-view {
        padding: 16px 0px 16px 16px;
        // max-height: calc(100vh - #{$top-margin-height} - #{$height-header} - #{$height-controls});
        overflow-y: scroll;
        box-sizing: border-box;
        #initiative-card-wrapper {
          margin: auto;
        }
      }
    }

    #side {
      flex: 0 1 400px;
      order: 2;
      #description-view {
        margin-top: 0px;
        p {
          margin-bottom: 8px;
        }
      }
      textarea {
        width: 100%;
        resize: vertical;
      }
    }
  }
}

.active {
  border-left: 4px solid blue;
}
</style>
