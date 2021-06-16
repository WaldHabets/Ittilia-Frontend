<template>
  <view-root>
    <template v-slot:header>
      <view-header />
    </template>

    <template v-slot:content>
      <portal-root id="portal">
        <portal-card text="Book" href="#" />
        <portal-card text="Map" href="#" />
        <portal-card text="Classes" href="/ittilia/classes" />
      </portal-root>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PortalCard from "@/components/portal/PortalCard.vue";
import PortalRoot from "@/components/portal/PortalRoot.vue";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";

@Component({
  components: {
    PortalCard,
    PortalRoot,
    ViewHeader,
    ViewRoot,
  },
})
export default class PortalIttilia extends Vue {}
</script>

<style lang="scss">
#portal {
  height: 100%;
}
</style>
