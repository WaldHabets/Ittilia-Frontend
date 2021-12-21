<template>
  <view-root>
    <template v-slot:header>
      <view-header />
    </template>

    <template v-slot:content>
      <portal-root id="nav-section">
        <portal-card
          :text="$store.getters.text('page-wiki')"
          href="/wiki"
          background="/static/img/placeholder.png"
        />
        <portal-card
          :text="$store.getters.text('page-map')"
          href="/map"
          background="/static/img/placeholder.png"
        />
        <portal-card
          :text="$store.getters.text('page-classes')"
          href="/classes"
          background="/static/img/placeholder.png"
        />
        <portal-card
          text="Item Forge"
          href="/tools/item-forge"
          background="/static/img/placeholder.png"
        />
        <portal-card
          text="Initiative Tracker"
          href="/tools/initiative-tracker"
          background="/static/img/placeholder.png"
        />
        <portal-card
          text="Player Sheets"
          href="/tools/party-manager"
          background="/static/img/placeholder.png"
        />
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
export default class Portal extends Vue {}
</script>

<style lang="scss"></style>
