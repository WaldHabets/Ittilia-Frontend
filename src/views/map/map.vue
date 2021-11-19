<template>
  <view-root>
    <template v-slot:header>
      <view-header />
    </template>

    <template v-slot:content>
      <leaflet />
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import Leaflet from "@/components/map/Leaflet.vue";

@Component({
  components: {
    ViewHeader,
    ViewRoot,
    Leaflet,
  },
})
export default class Portal extends Vue {}
</script>

<style lang="scss"></style>
