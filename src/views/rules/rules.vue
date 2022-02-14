<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>

    <template v-slot:content>
      <nav id="rules-index">
        <section class="rules-chapter">
          <header class="rules-chapter-header">
            <h1>{{ $text("rules-chapter-character") }}</h1>
          </header>
          <ol class="rules-chapter-index">
            <router-link class="rules-section" to="/rules/character-creation">
              <li>{{ $text("rules-section-create") }}</li>
            </router-link>
            <router-link class="rules-section" to="/rules/talents">
              <li>
                {{ $text("rules-section-talents") }}
              </li>
            </router-link>
          </ol>
        </section>
      </nav>
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

#rules-index {
  width: 100%;
  max-width: 700px;
  margin: auto;
  .rules-chapter {
    margin: 0 16px;
    text-align: left;
    h1 {
      font-size: $font-size-h1;
    }
    ol {
      font-size: $font-size-h2;
      .rules-section {
        display: block;
        color: $view-nav-background-dark;
        text-decoration: none;

        li {
          padding: 16px;
        }

        &:not(:last-child) {
          border-bottom: 1px solid $border;
        }
        &:hover {
          li {
            background-color: $accent-20;
          }

          color: $accent;
        }
      }
    }
  }
}
</style>
