<template>
  <table>
    <thead>
      <tr>
        <th>Level</th>
        <th>
          <button @click="prev" class="button">
            <svg viewBox="0 0 24 24" fill="white">
              <path :d="mdiArrowLeftBold" />
            </svg>
          </button>
        </th>
        <th v-for="level in levels" :key="level">
          {{ level }}
        </th>
        <th>
          <button @click="next" class="button">
            <svg viewBox="0 0 24 24" fill="white">
              <path :d="mdiArrowRightBold" />
            </svg>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="headerIndex in table.headers.length" :key="headerIndex">
        <td class="row-header">{{ table.headers[headerIndex - 1] }}</td>

        <td></td>
        <template v-for="level in levels">
          <td
            :key="`generic-class-${level}`"
            :class="{ focus: level === focusLevel }"
          >
            {{ table.data[level - 1][headerIndex - 1] }}
          </td>
        </template>
        <td></td>
      </tr>
      <template v-if="table.spellsPerLevel != null">
        <tr class="collapse-header">
          <td colspan="6" @click="toggleSpells">
            Spreuken per level
            <span v-if="displaySpells">▲</span>
            <span v-else>▼</span>
          </td>
        </tr>

        <tr
          v-for="spellLevel in table.spellsPerLevel.max"
          :key="`spellLevel-${spellLevel}`"
          :class="{ hidden: displaySpells }"
        >
          <td class="row-header">{{ spellLevel }}</td>
          <td></td>
          <template v-for="level in levels">
            <td
              :key="`spells-class-${level}`"
              :class="{ focus: level === focusLevel }"
            >
              {{ table.spellsPerLevel.data[level - 1][spellLevel - 1] }}
            </td>
          </template>
          <td></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { mdiArrowRightBold, mdiArrowLeftBold } from "@mdi/js";

import { CTable } from "@/models/ClassData.ts";

@Component({
  data: () => {
    return {
      mdiArrowRightBold,
      mdiArrowLeftBold,
    };
  },
})
export default class ClassTable extends Vue {
  private levels: number[] = [1, 2, 3];
  private focusLevel = 1;

  private displaySpells = false;

  @Prop(Object) private readonly table!: CTable;

  next(): void {
    if (this.focusLevel === 20) return;

    this.focusLevel += 1;

    if (this.levels[this.levels.length - 1] !== 20) {
      this.levels.forEach((item, index) => {
        Vue.set(this.levels, index, item + 1);
      });
    }
  }

  prev(): void {
    if (this.focusLevel === 1) return;

    this.focusLevel -= 1;

    if (this.levels[0] !== 1) {
      this.levels.forEach((item, index) => {
        Vue.set(this.levels, index, item - 1);
      });
    }
  }

  toggleSpells(): void {
    this.displaySpells = !this.displaySpells;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/colours.scss";
table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 4px;
  thead tr {
    background-color: $view-nav-background;
    color: white;
    height: 48px;
    th {
      padding: 4px;
    }
    button {
      width: 41px;
      height: 41px;
    }
  }
  details {
    width: 100%;
  }
  tbody tr,
  details tbody tr {
    height: 36px;

    &:nth-child(even) {
      background-color: #ededed;
    }
    td {
      padding: 4px;
      min-width: 32px;

      &.focus {
        background-color: #08001622;
      }

      &.row-header {
        font-weight: bold;
      }
    }
  }

  .collapse-header {
    cursor: pointer;
    background-color: $view-nav-background !important;
    color: white;
    font-weight: bold;
  }

  .hidden {
    display: none;
  }
}
</style>
