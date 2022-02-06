<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>
    <template v-slot:subnav>
      <nav-list-wiki></nav-list-wiki>
    </template>

    <template v-slot:content>
      <template v-if="index !== null && index !== undefined">
        <h1>{{ index.title }}</h1>

        <nav id="wiki-portal">
          <details v-for="(group, i) in index.groups" :key="`group-${i}`" open>
            <summary>
              {{ group.title }}
              <span class="badge"
                >{{ group.entries.length }} {{ $text("label-articles") }}</span
              >
            </summary>
            <ul>
              <li v-for="(entry, j) in group.entries" :key="`entry-${j}`">
                <router-link :to="`/wiki/${category}/${entry.href}`">{{
                  entry.name
                }}</router-link>
              </li>
            </ul>
          </details>
        </nav>
      </template>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import axios from "axios";

import PortalClassCard from "@/components/portal/PortalClassCard.vue";

import WikiIndex from "@/models/WikiIndex.ts";
import NavListWiki from "@/components/view/NavListWiki.vue";

@Component({
  components: {
    NavListWiki,
    ViewHeader,
    ViewRoot,
    PortalClassCard,
  },
})
export default class WikiTopic extends Vue {
  private index: WikiIndex | null = null;
  private category = "";

  @Watch("$route.params", { deep: true })
  onClassChanged(routeParams: any): void {
    this.__load(this.$route.params);
  }

  mounted(): void {
    this.__load(this.$route.params);
  }

  __load(routeParams: any): void {
    if (routeParams.category == null) {
      this.category = "";
    } else {
      this.category = routeParams.category;
      this.fetchContent(routeParams);
    }
  }

  fetchContent(routeParams: any): void {
    /**
     * Fetches the class data for className from the server
     */
    console.log(routeParams);

    axios
      .get(`/static/wiki/${routeParams.category}/index.json`)
      .then((response) => {
        this.index = response.data;
      })
      .catch((error) => {
        console.error("Error!", error.message);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colours.scss";
@import "../../assets/scss/details.scss";
@import "../../assets/scss/badge.scss";
@import "../../assets/scss/dims.scss";

h1 {
  width: calc(100% - 32px);
  max-width: 700px;

  padding: $medium;
  margin: auto;

  font-size: $font-size-h1;
  text-align: start;
  color: $view-nav-background;

  border-bottom: 1px solid #ababab;
}

#wiki-portal {
  width: calc(100% - 32px);
  max-width: 700px;

  padding: $medium;
  margin: auto;

  details {
    @include details-base();

    summary {
      display: flex;
      justify-content: space-between;
    }

    ul {
      padding: $tiny $small;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      list-style: none;
    }
  }
}
</style>
