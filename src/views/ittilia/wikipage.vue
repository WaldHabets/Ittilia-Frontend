<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>

    <template v-slot:content>
      <article v-if="wikiContent !== ''">
        <template v-if="wikiMeta != null">
          <city-header v-if="category === 'cities'" :metadata="wikiMeta" />
          <geography-header
            v-if="category === 'geography'"
            :metadata="wikiMeta"
          />
          <geopolitics-header
            v-if="category === 'geopolitics'"
            :metadata="wikiMeta"
          />
          <people-header v-if="category === 'people'" :metadata="wikiMeta" />
        </template>

        <main v-html="wikiContent"></main>

        <footer v-if="wikiMeta != null">
          <div id="footer-content">
            <span>© {{ wikiMeta.authors }}</span>
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
import axios from "axios";
import WikiMetadata from "@/models/WikiMetadata.ts";

import marked from "marked";
import DOMpurify from "dompurify";

import CityHeader from "@/components/wiki/CityHeader.vue";
import GeopoliticsHeader from "@/components/wiki/GeopoliticsHeader.vue";
import GeographyHeader from "@/components/wiki/GeographyHeader.vue";
import PeopleHeader from "@/components/wiki/PeopleHeader.vue";
import { Dictionary } from "vue-router/types/router";

type Map = {
  [key: string]: string | undefined;
};

type ParseResult = {
  metadata: Map;
  content: string;
} | null;

@Component({
  components: {
    PeopleHeader,
    GeographyHeader,
    ViewHeader,
    ViewRoot,
    CityHeader,
    GeopoliticsHeader,
  },
})
export default class WikiPage extends Vue {
  private category = "";
  private wikiMeta: WikiMetadata | null = null;
  private wikiContent = "";

  @Watch("$route.params", { deep: true })
  onClassChanged(routeParams: Dictionary<string>): void {
    this.__load(this.$route.params);
  }

  mounted(): void {
    this.__load(this.$route.params);
  }

  __load(routeParams: Dictionary<string>): void {
    this.category = routeParams.category;
    this.fetchArticle(routeParams);
  }

  __parse(markdown: string): ParseResult {
    const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown);

    if (match == null) return null;

    const frontMatter = match[1];
    const content = markdown.slice(match[0].length);

    const metadata: Map = {};

    frontMatter.split("\n").forEach((pair) => {
      const colonIndex = pair.indexOf(":");
      metadata[pair.slice(0, colonIndex).trim()] = pair
        .slice(colonIndex + 1)
        .trim();
    });

    return { metadata, content };
  }

  fetchArticle(routeParams: Dictionary<string>): void {
    /**
     * Fetches the class data for className from the server
     */
    axios
      .get(`/static/wiki/${routeParams.category}/${routeParams.topic}.md`)
      .then((response) => {
        let result = this.__parse(response.data);

        if (result == null) return;

        this.wikiMeta = result.metadata as unknown as WikiMetadata;

        const dirty = marked(result.content);
        this.wikiContent = DOMpurify.sanitize(dirty);

        console.log(this.wikiMeta);
      })
      .catch((error) => {
        console.error("Error!", error.message);
        this.wikiMeta = null;
        this.wikiContent = "";
      });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/article.scss";

article::v-deep {
  @include article();
}
</style>
