<template>
  <view-root>
    <template v-slot:header>
      <view-header>
        <template v-slot:start>
          <class-switcher/>
        </template>
      </view-header>
    </template>

    <template v-slot:content>

    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import ClassSwitcher from "@/components/ClassSwitcher.vue";

@Component({
  components: {
    ViewHeader,
    ViewRoot,
    ClassSwitcher,
  }
})
export default class ClassView extends Vue {}
</script>

<style lang="scss">
#portal {
  height: 100%;
}
</style>
