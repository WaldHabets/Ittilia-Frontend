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
            v-model="groupName"
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
      <div id="players-grid">
        <player-editor
          v-for="(playerWrapper, index) in players"
          v-bind:key="index"
          v-model="playerWrapper.player"
          @delete="() => players.splice(index, 1)"
        />
        <div id="button-wrapper">
          <button id="btn-add-player" class="button" @click="onAdd">
            <svg viewBox="0 0 24 24">
              <path :d="mdiPlus" />
            </svg>
          </button>
        </div>
      </div>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ViewRoot from "@/components/view/ViewRoot.vue";
import ViewHeader from "@/components/view/ViewHeader.vue";
import PlayerEditor from "@/components/party-manager/PlayerEditor.vue";
import Player from "@/models/Player.ts";
import PlayerWrapper from "@/models/PlayerWrapper.ts";
import Strings from "@/helpers/Strings.ts";
import { mdiPlus, mdiContentSave } from "@mdi/js";
import ImportButton from "@/components/controls/ImportButton.vue";

@Component({
  components: {
    ViewRoot,
    ViewHeader,
    PlayerEditor,
    ImportButton,
  },
})
export default class PartyManager extends Vue {
  private readonly mdiPlus: string = mdiPlus;
  private readonly mdiContentSave: string = mdiContentSave;
  private readonly s: Strings = new Strings();

  //private players: Player[] = [];
  private groupName = "";

  get players(): PlayerWrapper[] {
    return this.$store.state.players;
  }

  @Watch("players", { deep: true })
  onPlayersChanged(val: PlayerWrapper[]): void {
    this.$store.commit("setPlayers", val);
  }

  onAdd(): void {
    this.players.push(new PlayerWrapper(new Player()));
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

      let players: PlayerWrapper[] = [];
      obj.forEach((v: any) => {
        players.push(new PlayerWrapper(Object.assign(new Player(), v.player)));
      });

      this.onPlayersChanged(players);
    };
  }

  save(): void {
    var saveJson = JSON.stringify(this.players, null, 4);
    const blob = new Blob([saveJson], { type: "text/plain" });
    const a = document.createElement("a");
    a.download = `${this.groupName}.json`;
    a.href = URL.createObjectURL(blob);
    a.click();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/file.css";

#meta-groupname {
  margin-right: 8px;
}

#meta-save {
  width: 41px;
  height: 41px;
}

#players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 370px);
  grid-gap: 16px;
  align-items: center;
  margin: 16px;

  #button-wrapper {
    height: 339px;
    border: 3px dashed #b0bec5;

    display: flex;
    align-items: center;
    justify-content: center;

    #btn-add-player {
      width: 96px;
      height: 96px;
      svg {
        fill: white;
      }
    }
  }
}
</style>
