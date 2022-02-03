<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>

    <template v-slot:content>
      <div id="wiki-topic-wrapper">
        <router-link id="topic-1" class="wiki-topic" to="/lineages/urr">
          <h1>
            {{ $text("lineage-urr")
            }}<span class="badge">3 {{ $text("lineage-label") }}</span>
          </h1>
          <p>{{ $text("lineage-urr-brief") }}</p>
        </router-link>
        <router-link id="topic-2" class="wiki-topic" to="/lineages/urr-dranan">
          <h1>
            {{ $text("lineage-urr-dranan")
            }}<span class="badge">1 {{ $text("page-lineage") }}</span>
          </h1>
          <p>{{ $text("lineage-urr-dranan-brief") }}</p>
        </router-link>
        <router-link id="topic-3" class="wiki-topic" to="/lineages/elves/">
          <h1>
            {{ $text("lineage-elves")
            }}<span class="badge">2 {{ $text("lineage-label") }}</span>
          </h1>
          <p>{{ $text("lineage-elves-brief") }}</p>
        </router-link>
        <router-link id="topic-4" class="wiki-topic" to="/lineages/ghimach/">
          <h1>
            {{ $text("lineage-ghimach")
            }}<span class="badge">1 {{ $text("page-lineage") }}</span>
          </h1>
          <p>{{ $text("lineage-ghimach-brief") }}</p>
        </router-link>
        <router-link id="topic-5" class="wiki-topic" to="/wiki/cities/">
          <h1>
            {{ $text("lineage-curse")
            }}<span class="badge">1 {{ $text("page-lineage") }}</span>
          </h1>
          <p>{{ $text("lineage-curse-brief") }}</p>
        </router-link>
      </div>
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
  },
})
export default class LineagePortal extends Vue {}
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
