<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>
    <template v-slot:content>
      <div id="generator">
        <div id="creator" class="generator-content-block">
          <input
            id="item-name"
            class="text-input"
            v-model="itemname"
            :placeholder="strings.get('item-name')"
          />
          <div id="dropdown-wrapper" class="form-wrapper">
            <select id="item-type" v-model="itemtype" @input="onItemTypeUpdate">
              <option
                v-bind:key="key"
                v-for="(entry, key) in options"
                :value="key"
              >
                {{ key }}
              </option>
            </select>
            <select
              id="item-subtype"
              v-model="itemsubtype"
              @input="onItemSubtypeUpdate"
              v-if="listSubtypes != null"
            >
              <template v-if="listSubtypes.grouped">
                <option :value="null">No Subtype</option>
                <optgroup
                  v-bind:key="index"
                  v-for="(group, index) in listSubtypes.items"
                  :label="group.text"
                >
                  <option
                    v-bind:key="index"
                    v-for="(option, index) in group.options"
                    :value="option"
                  >
                    {{ option.subtype }}
                  </option>
                </optgroup>
              </template>
              <template v-else>
                <option :value="null">No Subtype</option>
                <option
                  v-bind:key="index"
                  v-for="(option, index) in listSubtypes.items"
                  :value="option"
                >
                  {{ option.subtype }}
                </option>
              </template>
            </select>
            <select id="item-rarity" v-model="itemrarity">
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Very Rare">Very Rare</option>
              <option value="Legendary">Legendary</option>
            </select>
          </div>
          <div id="checkbox-wrapper" class="form-wrapper">
            <label class="checkbox-label"
              ><input
                type="checkbox"
                name="attunement"
                v-model="attunement"
              />{{ strings.get("req-attune") }}</label
            >
            <input
              id="item-massa"
              class="text-input"
              v-model="itemmassa"
              placeholder="Bulk"
            />
          </div>
          <textarea
            id="item-description"
            class="text-input"
            v-model="rawdescription"
            :placeholder="strings.get('description')"
          />
          <div id="download-wrapper">
            <input
              id="file-name"
              class="text-input"
              v-model="filename"
              :placeholder="strings.get('filename')"
            />
            <button v-on:click="save" class="button">
              {{ strings.get("action-save") }}
            </button>
          </div>
        </div>
        <div id="preview" class="generator-content-block">
          <div
            id="icg-card"
            :style="{
              'background-image': 'url(/static/img/items/paper.jpg)',
            }"
          >
            <div id="icg-front" class="icg-side">
              <img :src="image" alt="icon" id="icg-icon" />
              <h1>{{ itemname }}</h1>
              <span class="icg-tags">
                {{ itemtype }}
                <span v-if="itemsubtype != null">
                  ({{ itemsubtype.subtype }})</span
                >, {{ itemrarity }}
              </span>
              <span class="icg-tags" v-if="attunement"
                >(requires attunement)</span
              >
              <span class="icg-extra">
                <svg viewBox="0 0 24 24" id="icg-massa">
                  <path :d="mdiBulk" />
                </svg>
                {{ itemmassa }}
              </span>
            </div>

            <div id="icg-back" class="icg-side">
              <h1>{{ itemname }}</h1>
              <div class="icg-h-line" :style="{ backgroundColor }"></div>
              <markdown :src="rawdescription" />
            </div>
          </div>
        </div>
        <p>
          Artwork by
          <a
            class="link"
            href="https://thomasjanssens00.wixsite.com/thomasjanssens"
            >Thomas Janssens</a
          >
        </p>
      </div>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import Markdown from "@/components/Markdown.vue";
import Strings from "@/helpers/Strings.ts";
import domtoimage from "dom-to-image";

import { mdiWeight } from "@mdi/js";

@Component({
  components: {
    ViewHeader,
    ViewRoot,
    Markdown,
  },
})
export default class ItemForge extends Vue {
  private mdiBulk: string = mdiWeight;
  private strings: Strings = new Strings();

  private itemimage = "";
  private itemname = "";
  private itemmassa = "";
  private itemsubtype: any = null;
  private filename = "";
  private m_itemtype = "Bescherming";
  private listSubtypes: any = null;
  private itemrarity = "Common";

  private attunement = false;
  private homebrew = false;

  private rawdescription = "";
  private image: any = null;
  private backgroundColor = "";
  private options: any = require("./options.json");

  get itemtype(): string {
    return this.m_itemtype;
  }

  set itemtype(value: string) {
    this.m_itemtype = value;
    this.onItemTypeUpdate();
  }

  save(): void {
    /**
     * Save the icg-card to a png file
     */
    let filename = this.filename === "" ? "item.png" : this.filename + ".png";

    const node = document.getElementById("icg-card");
    // const scale = 534 / node.offsetWidth

    if (node != null) {
      const scale = 2;

      domtoimage
        .toPng(node, {
          quality: 1.0,
          height: node.offsetHeight * scale,
          width: node.offsetWidth * scale,
          style: {
            transform: "scale(" + scale + ")",
            transformOrigin: "top left",
            // width: node.offsetWidth + 'px',
            // height: node.offsetHeight + 'px'
          },
        })
        .then(function (dataurl) {
          var link = document.createElement("a");
          link.download = filename;
          link.href = dataurl;
          link.click();
        });
    }
  }

  onItemTypeUpdate(): void {
    /**
     * Called when the type of the items is changed
     * Updates the relevant fields
     */
    console.log("onItemTypeUpdate");
    const itemtype = this.options[this.itemtype];
    const subtypes = itemtype.subtypes;

    console.log("updating Type");

    this.image = itemtype.image;
    this.itemsubtype = null;
    this.backgroundColor = itemtype.color;

    if (subtypes != null) {
      this.listSubtypes = subtypes;
      this.onItemSubtypeUpdate();
    } else {
      this.listSubtypes = null;
      this.itemmassa = itemtype.massa;
    }
  }

  onItemSubtypeUpdate(): void {
    /**
     * Update the massa of the item based on the subtype
     */
    console.log("onItemSubtypeUpdate");
    if (this.itemsubtype != null) {
      this.itemmassa = this.itemsubtype.massa;
    } else {
      this.itemmassa = "";
    }
  }

  mounted(): void {
    console.log("mounted");
    this.onItemTypeUpdate();
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/inputs.css";
.spell {
  color: #68a1e6;
  font-weight: bold;
}
.spell-homebrew {
  color: #6d67e5;
  font-weight: bold;
}

#generator {
  box-sizing: border-box;
  display: flex;

  flex-direction: column;
  align-items: center;

  padding: 16px;
  padding-top: 16px;
}
select {
  height: 36px;
}
.generator-content-block {
  box-sizing: border-box;
  width: 100%;
  max-width: 700px;
}
#preview {
  display: flex;
  background: #242527ab;
  justify-content: center;
  background-image: url("/static/images/background.svg");
  background-position: center;
  background-size: cover;
  align-items: center;
  margin: 16px 0px 8px 0px;
  padding: 64px;
  color: black;
}
#creator {
  padding: 16px;
  #item-name {
    box-sizing: border-box;
    width: 100%;
  }
  .form-wrapper {
    margin-top: 8px;
    margin-bottom: 8px;
    display: flex;
    align-items: start;
  }
  #dropdown-wrapper {
    .c-spinner:not(:last-of-type) {
      margin-right: 8px;
    }
  }
  #checkbox-wrapper {
    display: flex;
    align-items: center;
    *:not(:last-child) {
      margin-right: 8px;
    }
  }
  #item-description {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    resize: none;
  }
  #download-wrapper {
    margin-top: 8px;
    display: flex;
    #file-name {
      width: 100%;
      margin-right: 8px;
    }
  }
}
#icg-card {
  border: 1px solid #242527;
  width: 600px;
  min-height: 150px;
  font-size: 12.5px;
  background: white;
  text-align: start;

  display: flex;
  flex-direction: row;

  color: #242527;

  .icg-side {
    // display: inline-block;
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    padding: 16px;
  }

  #icg-front {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
    #icg-icon {
      width: 128px;
      height: 128px;
    }
    h1 {
      text-align: center;
      font-size: 21px;
      font-weight: bold;
      margin-top: 4px;
      margin-bottom: 0px;
    }
    .icg-tags {
      font-style: italic;
      font-size: 14px;
      margin-top: 4px;
    }
    .icg-extra {
      margin-top: 8px;
      display: flex;
      align-items: center;
      font-size: 18px;
      #icg-massa {
        width: 18px;
        height: 18px;
      }
    }
  }

  #icg-back {
    h1 {
      font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
      font-weight: 800;
      font-size: large;
      margin: 0;
      padding: 0;
      border: 0;
      margin-bottom: 8px;
    }
    p {
      text-align: justify;
      margin-top: 8px;
    }
  }

  #icg-item-description {
    line-height: 1.3em;
    p:not(:first-of-type) {
      margin-top: 14px;
    }
  }
  .icg-h-line {
    height: 2px;
    //background-color: #7ba0a9;
    width: 100%;
    margin: 4px 0px;
  }
  .icg-spell {
    color: #68a1e6;
    font-weight: bold;
  }
  .icg-spell-homebrew {
    color: #6d67e5;
    font-weight: bold;
  }
  #icg-homebrew {
    height: 0.8em;
    width: 0.8em;
  }
}
</style>
