<template>
  <div class="party-editor">
    <div class="header">
      <input
        type="text"
        :placeholder="s.get('name')"
        v-model="value.name"
        class="player-name text-input-v"
      />
      <button class="button-red" @click="onDelete">
        <svg viewBox="0 0 24 24">
          <path :d="mdiDelete" />
        </svg>
      </button>
    </div>
    <div class="stats">
      <stat-editor
        :icon="mdiShield"
        colour="#4aa0ce"
        :modelValue="value.ac"
        @update:modelValue="value.ac = +$event"
      />
      <stat-editor
        :icon="mdiEye"
        colour="#990f76"
        :modelValue="value.pp"
        @update:modelValue="value.pp = +$event"
      />
      <stat-editor
        :icon="mdiOneUp"
        colour="#259918"
        :modelValue="value.lvl"
        @update:modelValue="value.lvl = +$event"
      />
      <stat-editor
        :icon="mdiRunFast"
        colour="#2d0f99"
        :modelValue="value.spd"
        @update:modelValue="value.spd = +$event"
      />
      <stat-editor
        :icon="mdiHeart"
        colour="#dd2818"
        :modelValue="value.hp"
        @update:modelValue="value.hp = +$event"
      />
    </div>
    <div class="abilities">
      <ability-editor
        :label="s.get('ability-str')"
        :modelValue="value.str"
        @update:modelValue="value.str = +$event"
      />
      <ability-editor
        :label="s.get('ability-dex')"
        :modelValue="value.dex"
        @update:modelValue="value.dex = +$event"
      />
      <ability-editor
        :label="s.get('ability-con')"
        :modelValue="value.con"
        @update:modelValue="value.con = +$event"
      />
      <ability-editor
        :label="s.get('ability-int')"
        :modelValue="value.int"
        @update:modelValue="value.int = +$event"
      />
      <ability-editor
        :label="s.get('ability-wis')"
        :modelValue="value.wis"
        @update:modelValue="value.wis = +$event"
      />
      <ability-editor
        :label="s.get('ability-cha')"
        :modelValue="value.cha"
        @update:modelValue="value.cha = +$event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import AbilityEditor from "@/components/party-manager/AbilityEditor.vue";
import StatEditor from "@/components/party-manager/StatEditor.vue";
import Strings from "@/helpers/Strings.ts";
import Player from "@/models/Player.ts";

import {
  mdiOneUp,
  mdiShield,
  mdiHeart,
  mdiEye,
  mdiRunFast,
  mdiDelete,
} from "@mdi/js";

@Component({
  components: {
    AbilityEditor,
    StatEditor,
  },
})
export default class PlayerEditor extends Vue {
  private readonly mdiOneUp: string = mdiOneUp;
  private readonly mdiShield: string = mdiShield;
  private readonly mdiHeart: string = mdiHeart;
  private readonly mdiEye: string = mdiEye;
  private readonly mdiRunFast: string = mdiRunFast;
  private readonly mdiDelete: string = mdiDelete;

  private s: Strings = new Strings();

  @Model("modelValue", { type: Player })
  readonly value!: Player;

  onDelete(): void {
    this.$emit("delete");
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/inputs.css";
.party-editor {
  box-sizing: border-box;
  width: 100%;
  max-width: 370px;

  padding: 8px;
  border: 1px solid #b0bec5;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.7);

  .header {
    display: flex;
    flex-direction: row;
    button {
      height: 41px;
      width: 41px;
      margin-left: 8px;
    }
  }

  .stats {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
  }

  .abilities {
    display: grid;
    grid-template-columns: auto auto;
  }

  .player-name {
    grid-area: name;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
