<template>
  <view-root>
    <template v-slot:header>
      <view-header>
        <template #end>
          <button @click="showLegend">Legende</button>
        </template>
      </view-header>
    </template>

    <template v-slot:content>
      <leaflet />
      <side>
        <template #content>
          <h3>Legende</h3>
          <h4>Kaart</h4>
          <div class="legend-entry">
            <img src="/static/img/map-legend/bergen.png" alt="Icon" />
            <span>{{ $text("legend-bergen") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/taiga.png" alt="Icon" />
            <span>{{ $text("legend-taiga") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/naaldbos.png" alt="Icon" />
            <span>{{ $text("legend-naaldbos") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/loofbos.png" alt="Icon" />
            <span>{{ $text("legend-loofbos") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/tropisch-regen.png" alt="Icon" />
            <span>{{ $text("legend-tropisch-regen") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/tropisch-droog.png" alt="Icon" />
            <span>{{ $text("legend-tropisch-droog") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/mediteraan.png" alt="Icon" />
            <span>{{ $text("legend-mediteraan") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/matig-grasland.png" alt="Icon" />
            <span>{{ $text("legend-matig-grasland") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/tropisch-grasland.png" alt="Icon" />
            <span>{{ $text("legend-tropisch-grasland") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/toendra.png" alt="Icon" />
            <span>{{ $text("legend-toendra") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/swamp.png" alt="Icon" />
            <span>{{ $text("legend-swamp") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/map-desert.png" alt="Icon" />
            <span>{{ $text("legend-map-desert") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/sand-desert.png" alt="Icon" />
            <span>{{ $text("legend-sand-desert") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/water.png" alt="Icon" />
            <span>{{ $text("legend-water") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/road.png" alt="Icon" />
            <span>{{ $text("legend-road") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/train.png" alt="Icon" />
            <span>{{ $text("legend-train") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/ship.png" alt="Icon" />
            <span>{{ $text("legend-ship") }}</span>
          </div>
          <h4>Labels</h4>
          <div class="legend-entry">
            <img src="/static/img/map-legend/city-1.png" alt="Icon" />
            <span>{{ $text("legend-city-1") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/city-2.png" alt="Icon" />
            <span>{{ $text("legend-city-2") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/city-3.png" alt="Icon" />
            <span>{{ $text("legend-city-3") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/dungeon.png" alt="Icon" />
            <span>{{ $text("legend-dungeon") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/landmark.png" alt="Icon" />
            <span>{{ $text("legend-landmark") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/waypoint.png" alt="Icon" />
            <span>{{ $text("legend-waypoint") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/forest.png" alt="Icon" />
            <span>{{ $text("legend-forest") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/region.png" alt="Icon" />
            <span>{{ $text("legend-region") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/desert.png" alt="Icon" />
            <span>{{ $text("legend-desert") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/hills.png" alt="Icon" />
            <span>{{ $text("legend-hills") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/peak.png" alt="Icon" />
            <span>{{ $text("legend-peak") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/mountains.png" alt="Icon" />
            <span>{{ $text("legend-mountains") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/river.png" alt="Icon" />
            <span>{{ $text("legend-river") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/lake.png" alt="Icon" />
            <span>{{ $text("legend-lake") }}</span>
          </div>
          <div class="legend-entry">
            <img src="/static/img/map-legend/ocean.png" alt="Icon" />
            <span>{{ $text("legend-ocean") }}</span>
          </div>
        </template>
      </side>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import Leaflet from "@/components/map/Leaflet.vue";
import DialogBase from "@/components/dialogs/dialogbase.vue";
import Side from "@/components/view/Side.vue";

@Component({
  components: {
    Side,
    ViewHeader,
    ViewRoot,
    Leaflet,
    DialogBase,
  },
})
export default class Portal extends Vue {
  showLegend(): void {
    console.log(this.$refs.legendDialog);
    this.$refs.legendDialog.show();
  }
}
</script>

<style src="../../assets/scss/leaflet.css"></style>

<style lang="scss" scoped>
.legend-entry {
  display:flex;
  text-align: start;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
}
</style>
