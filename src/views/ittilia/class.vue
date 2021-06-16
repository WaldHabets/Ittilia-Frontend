<template>
  <view-root>
    <template v-slot:header>
      <view-header/>
    </template>

    <template v-slot:content>

    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";

@Component({
  components: {
    ViewHeader,
    ViewRoot,
  }
})
export default class ClassView extends Vue {}
</script>

<style lang="scss">
#portal {
  height: 100%;
}
</style>
