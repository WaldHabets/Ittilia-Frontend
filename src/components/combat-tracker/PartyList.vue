<template>
  <table id="party-list">
    <thead>
      <th>{{ s.get("player") }}</th>
      <th>{{ s.get("initiative") }}</th>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in entries" v-bind:key="index">
        <td v-bind:key="`col-label-${index}`">
          <label>{{ entry.name }}</label>
        </td>
        <td v-bind:key="`col-input-${index}`">
          <input
            type="number"
            min="0"
            onClick="this.select()"
            v-model="entry.initiative"
            class="text-input-c"
          />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button" @click="add">
            {{ s.get("action-add") }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CombatEntry from "@/models/CombatEntry";
import Strings from "@/helpers/Strings.ts";
import PlayerWrapper from "@/models/PlayerWrapper.ts";

@Component
export default class PartyList extends Vue {
  private readonly s: Strings = new Strings();

  get entries(): CombatEntry[] {
    let entries: CombatEntry[] = [];

    this.$store.state.players.forEach((p: PlayerWrapper) => {
      let player = p.player;
      let template = new CombatEntry();
      template.name = player.name;
      template.ac = player.ac;
      template.pp = player.pp;
      template.mr = 0;
      template.xp = player.lvl;
      template.isplayer = true;
      template.allegiance = "player";
      template.maximum_hp = player.hp;
      template.curent_hp = player.hp;
      template.initiative = 10;

      entries.push(template);
    });
    return entries;
  }

  add(): void {
    this.$emit("add", this.entries);
  }
}
</script>

<style lang="scss">
#party-list {
  margin-top: 8px;
  box-sizing: border-box;

  border-collapse: separate;
  border-spacing: 8px;

  width: 100%;

  padding: 8px;

  border: 1px solid #ababab;

  tr {
    td {
      input[type="number"] {
        max-width: 72px;
      }
      button {
        width: 50%;
        min-width: 72px;
      }
    }
  }
}
</style>
