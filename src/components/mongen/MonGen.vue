<template>
  <div>
    <form>
      <fieldset>
        <legend>General</legend>
        <label>CR</label>
        <select v-model="cr">
          <option
            v-for="(item, index) in crList"
            :key="`cr-select-${index}`"
            :value="item"
          >
            {{ item.challengeRating }}
          </option>
        </select>

        <label>Size</label>
        <select v-model="size">
          <option
            v-for="(item, index) in sizeList"
            :key="`cr-select-${index}`"
            :value="item"
          >
            {{ item.size }}
          </option>
        </select>
      </fieldset>
      <fieldset>
        <legend>Attributes</legend>
        <span>{{ attributeBudget - attributeCost }}/{{ attributeBudget }}</span>
        <attribute-select :max="cr.maxStat" @change="(e) => (str = e)" />
        <attribute-select :max="cr.maxStat" @change="(e) => (dex = e)" />
        <attribute-select :max="cr.maxStat" @change="(e) => (con = e)" />
        <attribute-select :max="cr.maxStat" @change="(e) => (int = e)" />
        <attribute-select :max="cr.maxStat" @change="(e) => (wis = e)" />
        <attribute-select :max="cr.maxStat" @change="(e) => (cha = e)" />
      </fieldset>
      <fieldset>
        <legend>Defenses</legend>

        <label>Armor</label>
        <select v-model="armor">
          <option
            v-for="(item, index) in armorList"
            :key="`cr-select-${index}`"
            :value="item"
          >
            {{ item.armor }}
          </option>
        </select>

        <label>Fort</label>
        <input type="checkbox" v-model="fort" />

        <label>Refl</label>
        <input type="checkbox" v-model="refl" />

        <label>Will</label>
        <input type="checkbox" v-model="will" />
      </fieldset>

      <fieldset>
        <legend>Aanvallen</legend>

        <label>Aanvallen</label>
        <input type="number" min="1" v-model.number="attacks" />
      </fieldset>
    </form>
    <button @click="generate">Generate</button>
    <table>
      <tr>
        <td colspan="3">
          AC: <span>{{ result.ac }}</span>
        </td>
        <td colspan="3">
          HP: <span>{{ result.hpAvg }}</span> <span>({{ result.hp }})</span>
        </td>
      </tr>
      <tr>
        <th>STR</th>
        <th>DEX</th>
        <th>CON</th>
        <th>INT</th>
        <th>WIS</th>
        <th>CHA</th>
      </tr>
      <tr>
        <td>{{ result.str }} ({{ result.strMod }})</td>
        <td>{{ result.dex }} ({{ result.dexMod }})</td>
        <td>{{ result.con }} ({{ result.conMod }})</td>
        <td>{{ result.int }} ({{ result.intMod }})</td>
        <td>{{ result.wis }} ({{ result.wisMod }})</td>
        <td>{{ result.cha }} ({{ result.chaMod }})</td>
      </tr>
      <tr>
        <td colspan="2">
          Fort: <span>{{ result.saves.fort }}</span>
        </td>
        <td colspan="2">
          Refl: <span>{{ result.saves.refl }}</span>
        </td>
        <td colspan="2">
          Will: <span>{{ result.saves.will }}</span>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <th>Defences</th>
        <th>Attacks</th>
      </tr>
      <tr>
        <td>
          AC: <span>{{ result.ac }}</span
          ><br />
          HP: <span>{{ result.hpAvg }}</span> <span>({{ result.hp }})</span
          ><br />
          Fort: <span>{{ result.saves.fort }}</span
          ><br />
          Refl: <span>{{ result.saves.refl }}</span
          ><br />
          Will: <span>{{ result.saves.will }}</span
          ><br />
        </td>
        <td>
          Damage Dice: <span>{{ result.damageDice }}</span
          ><br />
          Multiattack: <span>{{ result.attacks }}</span
          ><br />
          Max damage dice for attacks:
          <span>{{ result.maxDamageDiceAttack }}</span
          ><br />
          max damage dice for actions:
          <span>{{ result.maxDamageDiceAction }}</span
          ><br />
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import AttributeSelect from "./AttributeSelect.vue";

import DiceHelper from "@/helpers/DiceHelper.ts";

import ArmorData from "./ArmorData";
import AttributeData from "./AttributeData";
import CRData from "./CRData";
import MonData from "./MonData";
import SizeData from "./SizeData";

@Component({
  components: {
    AttributeSelect,
  },
})
export default class MonGen extends Vue {
  private crList: CRData[] = require("@/assets/data/mon-cr.json");
  private cr: CRData = this.crList[0];

  private sizeList: SizeData[] = require("@/assets/data/mon-size.json");
  private size: SizeData = this.sizeList[0];

  private armorList: ArmorData[] = require("@/assets/data/mon-armor.json");
  private armor: ArmorData = this.armorList[0];

  private shield = false;

  private attacks = 1;

  private get attributeCost(): number {
    return (
      this.str.value +
      this.dex.value +
      this.con.value +
      this.int.value +
      this.wis.value +
      this.cha.value
    );
  }
  private get attributeBudget(): number {
    return this.cr.maxTotal;
  }
  private get bonusHitDice(): number {
    return Math.max(0, this.attributeBudget - this.attributeCost);
  }

  private str: AttributeData = { value: 0, text: "", minimum: 0 };
  private dex: AttributeData = { value: 0, text: "", minimum: 0 };
  private con: AttributeData = { value: 0, text: "", minimum: 0 };
  private int: AttributeData = { value: 0, text: "", minimum: 0 };
  private wis: AttributeData = { value: 0, text: "", minimum: 0 };
  private cha: AttributeData = { value: 0, text: "", minimum: 0 };

  private result: MonData = new MonData();

  private fort = false;
  private refl = false;
  private will = false;

  generate(): void {
    console.log("generate");

    this.result.cr = this.cr.challengeRating;
    this.result.pb = this.cr.proficiencyBonus;

    console.log(this.str);
    console.log(this.str.minimum);

    this.result.str = this.str.minimum + DiceHelper.roll(4);
    this.result.dex = this.dex.minimum + DiceHelper.roll(4);
    this.result.con = this.con.minimum + DiceHelper.roll(4);
    this.result.int = this.int.minimum + DiceHelper.roll(4);
    this.result.wis = this.wis.minimum + DiceHelper.roll(4);
    this.result.cha = this.cha.minimum + DiceHelper.roll(4);

    let numHitDice: number =
      Math.floor(this.result.cr + DiceHelper.roll(this.result.pb)) +
      this.bonusHitDice;
    let hpBonus: number = numHitDice * this.result.conMod;

    this.result.hpAvg = (numHitDice * (this.size.hitDice + 1)) / 2 + hpBonus;

    this.result.hp = `${numHitDice}d${this.size.hitDice} + ${hpBonus}`;

    this.result.damageDice = this.size.damageDice;
    this.result.attackDice = this.cr.attackDice;
    this.result.attacks = this.attacks;

    let tempAC = this.armor.base;
    tempAC += this.armor.dex ? this.result.dexMod : 0;
    tempAC += this.armor.con ? this.result.conMod : 0;
    tempAC = this.armor.limit > 0 ? Math.max(tempAC, this.armor.limit) : tempAC;
    tempAC += this.armor.bonus;
    tempAC += this.shield ? 2 : 0;
    this.result.ac = tempAC;

    this.result.saves.fort = Math.max(this.result.strMod, this.result.conMod);
    this.result.saves.fort += this.fort ? this.result.pb : 0;
    this.result.saves.refl = Math.max(this.result.dexMod, this.result.intMod);
    this.result.saves.refl += this.refl ? this.result.pb : 0;
    this.result.saves.will = Math.max(this.result.wisMod, this.result.chaMod);
    this.result.saves.will += this.will ? this.result.pb : 0;

    console.log(this.result);
  }
}
</script>
