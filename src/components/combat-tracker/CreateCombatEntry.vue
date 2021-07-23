<template>
  <form class="combat-entry-form" action="javascript:void(0);">
    <table>
      <tbody>
        <tr>
          <td class="tag"><label for="fname">Name</label></td>
          <td class="value">
            <input id="fname" type="text" name="fname" v-model="name" />
          </td>
        </tr>
        <tr>
          <td class="tag"><label for="finit">Initiative</label></td>
          <td class="value">
            <input id="finti" type="text" name="finit" v-model="initiative" />
          </td>
        </tr>
        <tr>
          <td class="tag"><label for="fhp">Max Hit Points</label></td>
          <td class="value">
            <input id="fhp" type="text" name="fhp" v-model="hp" />
          </td>
        </tr>
        <tr>
          <td class="tag"><label for="fmr">Morale Rating</label></td>
          <td class="value">
            <input id="fmr" type="text" name="fmr" v-model="mr" />
          </td>
        </tr>
        <tr>
          <td class="tag"><label for="form-pp">Passive Perception</label></td>
          <td class="value">
            <input id="form-pp" type="number" name="form-pp" v-model="pp" />
          </td>
        </tr>
        <tr>
          <td class="tag"><label for="fac">Armor Class</label></td>
          <td class="value">
            <input if="fac" type="number" name="fac" v-model="ac" />
          </td>
        </tr>
        <tr>
          <td class="tag">
            <input
              type="radio"
              value="enemy"
              v-model="allegiance"
              id="allegiance-enemy"
              name="form-allegiance"
            />
          </td>
          <td class="value">
            <label for="allegiance-enemy">Vijand</label>
          </td>
        </tr>
        <tr>
          <td class="tag">
            <input
              type="radio"
              value="ally"
              v-model="allegiance"
              id="allegiance-ally"
              name="form-allegiance"
            />
          </td>
          <td class="value">
            <label for="allegiance-ally">Bondgenoot</label>
          </td>
        </tr>
        <tr>
          <td class="tag">
            <input
              type="radio"
              value="player"
              v-model="allegiance"
              id="allegiance-player"
              name="form-allegiance"
            />
          </td>
          <td class="value">
            <label for="allegiance-player">Speler</label>
          </td>
        </tr>
        <tr>
          <td class="tag">
            <label for="form-xp">{{allegiance == "player" ? "Level" : "XP"}}</label>
          </td>
          <td class="value">
            <input type="number" id="form-xp" name="form-xp" v-model="xp" />
          </td>
        </tr>
        <tr>
            <td colspan="2">
                <button class="button" @click="add">Add</button>
            </td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DiceHelper from "@/helpers/DiceHelper";
import CombatEntry from "@/models/CombatEntry";

@Component
export default class CreateCombatEntry extends Vue {
  private name = "";
  private initiative = "d20";
  private hp = "";
  private mr = "2d6";
  private ac = 10;
  private xp = 10;
  private pp = 10;
  private isplayer = false;
  private allegiance = "enemy";

  private diceHelper: DiceHelper = new DiceHelper();

  add(): void {
    let template = new CombatEntry();
    template.name = this.name;
    template.initiative = this.diceHelper.parse(this.initiative);
    template.ac = parseInt(this.ac);
    template.mr = this.diceHelper.parse(this.mr);
    template.xp = parseInt(this.xp);
    template.pp = parseInt(this.pp);
    template.maximum_hp = this.diceHelper.parse(this.hp);
    template.curent_hp = template.maximum_hp;
    template.isplayer = this.isplayer;
    template.allegiance = this.allegiance;
    this.$emit("add", template);
  }
}
</script>

<style lang="scss">
@import "../../scss/buttons.css";

.combat-entry-form {
    padding: 8px;
    margin: 8px;

    border: 1px solid #ababab;

    table {
        box-sizing: border-box;
        
        border-collapse: separate;
        border-spacing: 8px;

        width: 100%;

        td {
            &.tag {
                text-align: end;
            }
            &.value {
                text-align: start;
                * {
                    box-sizing: border-box;
                    width: 100%;
                }
            }
            button {
                width: 50%;
                min-width: 72px;
            }
        }
    }
}
</style>
