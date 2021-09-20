<template>
  <form class="combat-entry-form" action="javascript:void(0);">
    <div>
      <label class="typo__label">Select Preset</label>
      <multiselect
        @select="loadMonster"
        :options="index"
        placeholder="Select one"
        :label="label"
        :track-by="label"
      ></multiselect>
    </div>
    <table>
      <tbody>
        <tr>
          <td class="tag">
            <label for="fname"><string tag="name" /></label>
          </td>
          <td class="value">
            <input
              id="fname"
              type="text"
              name="fname"
              v-model="name"
              class="text-input-c"
            />
          </td>
        </tr>
        <tr>
          <td class="tag">
            <label for="finit"><string tag="initiative" /></label>
          </td>
          <td class="value">
            <input
              id="finti"
              type="text"
              name="finit"
              v-model="initiative"
              class="text-input-c"
            />
          </td>
        </tr>
        <tr>
          <td class="tag">
            <label for="fhp"><string tag="max-hp" /></label>
          </td>
          <td class="value">
            <input
              id="fhp"
              type="text"
              name="fhp"
              v-model="hp"
              class="text-input-c"
            />
          </td>
        </tr>
        <tr>
          <td class="tag">
            <label for="fmr"><string tag="stat-mr" /></label>
          </td>
          <td class="value">
            <input
              id="fmr"
              type="text"
              name="fmr"
              v-model="mr"
              class="text-input-c"
            />
          </td>
        </tr>
        <tr>
          <td class="tag">
            <label for="form-pp"><string tag="stat-pp" /></label>
          </td>
          <td class="value">
            <input
              id="form-pp"
              type="number"
              name="form-pp"
              v-model="pp"
              class="text-input-c"
            />
          </td>
        </tr>
        <tr>
          <td class="tag">
            <label for="fac"><string tag="stat-ac" /></label>
          </td>
          <td class="value">
            <input
              if="fac"
              type="number"
              name="fac"
              v-model="ac"
              class="text-input-c"
            />
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
            <label for="allegiance-enemy"><string tag="enemy" /></label>
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
            <label for="allegiance-ally"><string tag="ally" /></label>
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
            <label for="allegiance-player"><string tag="player" /></label>
          </td>
        </tr>
        <tr>
          <td class="tag">
            <label for="form-xp">{{
              allegiance == "player" ? "Level" : "XP"
            }}</label>
          </td>
          <td class="value">
            <input
              type="number"
              id="form-xp"
              name="form-xp"
              v-model="xp"
              class="text-input-c"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="button" @click="add">
              <string tag="action-add" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Multiselect from "vue-multiselect";
import DiceHelper from "@/helpers/DiceHelper";
import CombatEntry from "@/models/CombatEntry";
import String from "@/components/String.vue";
import axios from "axios";

@Component({
  components: {
    Multiselect,
    String,
  },
})
export default class CreateCombatEntry extends Vue {
  private name = "";
  private initiative = "d20";
  private hp = "";
  private mr = "2d6";
  private ac = "10";
  private xp = "10";
  private pp = "10";
  private isplayer = false;
  private allegiance = "enemy";

  private index = [];

  private diceHelper: DiceHelper = new DiceHelper();

  get label(): string {
    return "name-" + this.$store.state.language;
  }

  loadIndex(): void {
    axios
      .get("/static/monsters/index.json")
      .then((response) => (this.index = response.data))
      .catch((error) => {
        console.error("Error!", error.message);
        this.index = [];
      });
  }

  loadMonster(monster: Record<string, unknown>, id: string): void {
    console.log(monster);
    console.log(id);
    axios
      .get(`/static/monsters/${monster.template}.json`)
      .then((response) => {
        this.name = monster[this.label];
        this.initiative = response.data["initiative"];
        this.ac = response.data["armor-class"];
        this.mr = response.data["morale-rating"];
        this.xp = response.data["xp"];
        this.pp = response.data["passive-perception"];
        this.hp = response.data["max-hp"];
        this.isplayer = false;
        this.allegiance = response.data["allegiance"];
      })
      .catch((error) => {
        console.error("Error!", error.message);
      });
  }

  add(): void {
    let template = new CombatEntry();
    template.name = this.name;
    template.initiative = this.diceHelper.parse(this.initiative);
    template.ac = parseInt(this.ac);
    template.mr = this.diceHelper.parse(this.mr);
    template.pp = parseInt(this.pp);
    template.maximum_hp = this.diceHelper.parse(this.hp);
    template.curent_hp = template.maximum_hp;
    template.isplayer = this.isplayer;
    template.allegiance = this.allegiance;
    if (this.allegiance == "player") {
      let temp_xp = parseInt(this.xp);
      temp_xp = Math.min(temp_xp, 20);
      temp_xp = Math.max(temp_xp, 1);
      console.log(temp_xp);
      template.xp = temp_xp;
    } else {
      template.xp = parseInt(this.xp);
    }
    this.$emit("add", template);
  }

  mounted(): void {
    this.loadIndex();
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import "../../scss/buttons.css";
@import "../../scss/inputs.css";

.combat-entry-form {
  padding: 8px;

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
