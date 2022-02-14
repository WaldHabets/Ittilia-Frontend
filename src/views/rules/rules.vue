<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>

    <template v-slot:content>
      <div id="wiki-topic-wrapper">
        <section class="rules-chapter">
          <header class="rules-chapter-header">
            <h1>{{ $text("rules-chapter-character") }}</h1>
          </header>
          <ul class="rules-chapter-index">
            <li>
              <router-link to="/rules/character-creation">
                {{ $text("rules-section-create") }}
              </router-link>
            </li>
            <li>
              <router-link to="/rules/talents">
                {{ $text("rules-section-talents") }}
              </router-link>
            </li>
          </ul>
        </section>
      </div>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import NavListLineages from "@/components/view/NavListLineages.vue";

@Component({
  components: {
    NavListLineages,
    ViewHeader,
    ViewRoot,
  },
})
export default class Rules extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colours.scss";
@import "../../assets/scss/details.scss";
@import "../../assets/scss/dims.scss";

#wiki-portal {
  width: calc(100% - 32px);
  max-width: 700px;

  padding: $medium;
  margin: auto;

  details {
    @include details-base();

    ul {
      padding: $tiny $small;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
}
#wiki-topic-wrapper {
  width: 100%;
  max-width: 700px;
  margin: auto;
  .wiki-topic {
    text-align: left;
    text-decoration: none;
    padding: 16px;
    color: $view-nav-background-dark;
    display: block;

    h1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .badge {
      display: inline-block;
      color: white;
      background-color: $accent;
      border-radius: 8px;
      font-size: 12px;
      padding: 4px 8px;
    }

    * {
      margin: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $border;
    }
    &:hover {
      h1 {
        color: $accent;
      }
      background-color: $accent-20;
    }
  }
}
</style>
