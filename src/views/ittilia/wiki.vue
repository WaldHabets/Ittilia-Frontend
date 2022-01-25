<template>
  <view-root>
    <template v-slot:header>
      <view-header> </view-header>
    </template>

    <template v-slot:content>
      <div id="wiki-topic-wrapper">
        <router-link id="topic-1" class="wiki-topic" to="/wiki/general/">
          <h1>Algemeen<span class="badge">4 artikels</span></h1>
          <p>...</p>
        </router-link>
        <router-link id="topic-2" class="wiki-topic" to="/wiki/cosmos/">
          <h1>Cosmos<span class="badge">0 artikels</span></h1>
          <p>
            Alles over Ae, de Yxon, de Spiegelwereld en de vele andere lagen van
            de cosmos.
          </p>
        </router-link>
        <router-link id="topic-3" class="wiki-topic" to="/wiki/geography/">
          <h1>Geografie<span class="badge">5 artikels</span></h1>
          <p>
            Verken de geografie van Ittilia; haar wildernis en al haar
            wonderlijke locaties.
          </p>
        </router-link>
        <router-link id="topic-4" class="wiki-topic" to="/wiki/geopolitics/">
          <h1>Geopolitiek<span class="badge">7 artikels</span></h1>
          <p>
            Leer alles over de politiek: de rijken en organisaties die heersen
            over het dagdagelijkse leven van de Ittilische burger.
          </p>
        </router-link>
        <router-link id="topic-5" class="wiki-topic" to="/wiki/cities/">
          <h1>Steden<span class="badge">9 artikels</span></h1>
          <p>
            Zoom in op één van de vele steden of andere markante sites in de
            landen van Ittilia.
          </p>
        </router-link>
        <router-link id="topic-6" class="wiki-topic" to="/wiki/people/">
          <h1>Personen<span class="badge">3 artikels</span></h1>
          <p>...</p>
        </router-link>
        <router-link id="topic-7" class="wiki-topic" to="/wiki/creatures/">
          <h1>Wezens<span class="badge">0 artikels</span></h1>
          <p>
            Wat verschuilt er zich in de hoge bergen of donkere bossen van
            Ittilia.
          </p>
        </router-link>
      </div>
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
import WikiNav from "@/components/wiki/WikiNav.vue";

@Component({
  components: {
    ViewHeader,
    ViewRoot,
    PortalClassCard,
    WikiNav,
  },
})
export default class Wiki extends Vue {
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
