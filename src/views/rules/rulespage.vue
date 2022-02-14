<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>

    <template v-slot:content>
      <article v-if="rulesContent !== ''">
        <header v-if="rulesMeta != null">
          <h1>{{ rulesMeta.name }}</h1>
        </header>

        <main v-html="rulesContent"></main>

        <footer v-if="rulesMeta != null">
          <div id="footer-content">
            <span>© {{ rulesMeta.authors }}</span>
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

import { Dictionary } from "vue-router/types/router";
import NavListWiki from "@/components/view/NavListWiki.vue";

type Map = {
  [key: string]: string | undefined;
};

type ParseResult = {
  metadata: Map;
  content: string;
} | null;

@Component({
  components: {
    NavListWiki,
    ViewHeader,
    ViewRoot,
  },
})
export default class RulesPage extends Vue {
  private category = "";
  private rulesMeta: WikiMetadata | null = null;
  private rulesContent = "";

  @Watch("$route.params", { deep: true })
  onClassChanged(routeParams: Dictionary<string>): void {
    this.__load(routeParams);
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
      .get(`/static/rules/${routeParams.topic}.md`)
      .then((response) => {
        let result = this.__parse(response.data);

        if (result == null) return;

        this.rulesMeta = result.metadata as unknown as WikiMetadata;

        const dirty = marked(result.content);
        this.rulesContent = DOMpurify.sanitize(dirty);
      })
      .catch((error) => {
        console.error("Error!", error.message);
        this.rulesMeta = null;
        this.rulesContent = "";
      });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/article.scss";

article::v-deep {
  @include article();
  @import "../../assets/scss/keywords.scss";
  header {
    background: #eeeeee;
    h1 {
      @include article-content-box();
    }
  }
}
</style>
