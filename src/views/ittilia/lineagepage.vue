<template>
  <view-root :page-area="$text('page-lineage')">
    <template v-slot:header>
      <view-header></view-header>
    </template>
    <template #subnav>
      <nav-list-lineages></nav-list-lineages>
    </template>
    <template v-slot:content>
      <article v-if="lineageData">
        <header>
          <div class="header-content">
            <h1>{{ lineageData.name }}</h1>
            <div v-if="sublineages.length > 0" class="tab-bar">
              <span :class="{ selected: selected === -1 }" @click="select(-1)"
                >Base</span
              >
              <span
                v-for="(lineage, index) in sublineages"
                :key="index"
                :class="{ selected: selected === index }"
                @click="select(index)"
              >
                {{ lineage }}
              </span>
            </div>
          </div>
        </header>

        <main
          v-if="sublineages.length <= 0 || selected === -1"
          v-html="parse(lineageData.description)"
        ></main>
        <main
          v-else
          v-html="parse(lineageData.lineages[selected].description)"
        ></main>

        <footer>
          <div id="footer-content">
            <span>© {{ lineageData.author }}</span>
          </div>
        </footer>
      </article>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import { Lineage, SubLineage } from "@/models/Lineage.ts";
import axios from "axios";
import Markdown from "@/components/Markdown.vue";
import marked from "marked";
import DOMpurify from "dompurify";
import NavListLineages from "@/components/view/NavListLineages.vue";

@Component({
  components: {
    NavListLineages,
    Markdown,
    ViewHeader,
    ViewRoot,
  },
})
export default class LineagePage extends Vue {
  private lineageData: Lineage | null = null;
  private selected = -1;

  @Watch("$route.params.lineage", { deep: true })
  onClassChanged(lineage: string): void {
    this.fetchLineage(lineage);
  }

  mounted(): void {
    this.fetchLineage(this.$route.params.lineage);
  }

  select(index: number): void {
    this.selected = index;
  }

  get sublineages(): string[] {
    if (this.lineageData === null || this.lineageData.lineages.length === 0) {
      return [];
    } else {
      return this.lineageData.lineages.map(
        (lineage: SubLineage) => lineage.name
      );
    }
  }

  fetchLineage(lineage: string): void {
    axios
      .get(`/static/json/lineages/${lineage}.json`)
      .then((response) => {
        this.selected = -1;
        this.lineageData = response.data;
      })
      .catch((error) => {
        console.error("Error!", error.message);
        this.lineageData = null;
      });
  }

  parse(markdown: string): string {
    const dirty = marked(markdown);
    return DOMpurify.sanitize(dirty);
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/article.scss";
@import "../../assets/scss/colours.scss";

article::v-deep {
  header {
    background: #eeeeee;
    .header-content {
      @include article-content-box();
      padding-bottom: 0;
      padding-top: 0;
      .tab-bar {
        width: 100%;

        span {
          padding: 4px 8px;
          box-sizing: border-box;
          display: inline-block;
          font-weight: bold;
          &:hover {
            cursor: pointer;
            color: $accent;
            background-color: $accent-40;
            border-bottom: 2px solid $accent;
            border-radius: 4px 4px 0 0;
          }
          &.selected {
            border-bottom: 2px solid $accent;
          }
        }
      }
    }
  }

  @include article();
}
</style>
