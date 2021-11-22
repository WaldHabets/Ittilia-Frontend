<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>

    <template v-slot:content>
      <wiki-article-nav :backTarget="`/wiki/${category}`" />
      <article v-if="wikiContent != ''">
        <template v-if="wikiMeta != null">
          <city-header v-if="category == 'cities'" :metadata="wikiMeta" />
          <geopolitics-header
            v-if="category == 'geopolitics'"
            :metadata="wikiMeta"
          />
        </template>

        <main v-html="wikiContent"></main>

        <footer v-if="wikiMeta != null">
          <span>{{ wikiMeta.authors }}</span>
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
import WikiArticleNav from "@/components/wiki/WikiArticleNav.vue";

import marked from "marked";
import DOMpurify from "dompurify";

import CityHeader from "@/components/wiki/CityHeader.vue";
import GeopoliticsHeader from "@/components/wiki/GeopoliticsHeader.vue";

type Map = {
  [key: string]: string | undefined;
};

@Component({
  components: {
    ViewHeader,
    ViewRoot,
    CityHeader,
    GeopoliticsHeader,
    WikiArticleNav,
  },
})
export default class WikiPage extends Vue {
  private category = "";
  private wikiMeta: WikiMetadata | null = null;
  private wikiContent = "";

  @Watch("$route.params", { deep: true })
  onClassChanged(routeParams: any): void {
    this.__load(this.$route.params);
  }

  mounted(): void {
    this.__load(this.$route.params);
  }

  __load(routeParams: any) {
    this.category = routeParams.category;
    this.fetchContent(routeParams);
  }

  __parse(markdown: string) {
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

  fetchContent(routeParams: any): void {
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
@import "../../assets/scss/colours.scss";
@import "../../assets/scss/dims.scss";
article::v-deep {
  box-sizing: border-box;
  text-align: start;
  max-width: $wiki-article-width;
  margin: auto;
  padding: $wiki-article-padding;

  @media screen and (max-width: $wiki-article-width-threshold) {
    margin-bottom: $wiki-article-nav-height;
  }

  h1,
  h2,
  h3 {
    color: #080016;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  main {
    strong {
      color: #7b2a20;
    }

    p {
      font-size: 18px;
    }

    img {
      width: 100%;
    }
  }
  footer {
    border-top: 1px solid #2c3e50;
  }
}
</style>
