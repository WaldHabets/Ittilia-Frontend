<template>
  <view-root :page-area="$text('page-classes')">
    <template v-slot:header>
      <view-header>
        <template v-slot:start>
          <class-switcher />
        </template>
        <template v-slot:end>
          <button class="button header-button">PRINT</button>
        </template>
      </view-header>
    </template>
    <template #subnav>
      <nav-list-classes></nav-list-classes>
    </template>

    <template v-slot:content>
      <select id="subclass-switcher" v-if="classData" v-model="subclass">
        <option value="">No Subclass</option>
        <option
          v-for="(subclass, key) in classData.subclasses"
          :key="key"
          :value="subclass.value"
        >
          {{ subclass.text }}
        </option>
      </select>

      <aside v-if="classData" id="class-table">
        <class-table :table="classData.table" />
      </aside>

      <main id="main" v-if="classData">
        <section
          class="level-group"
          v-for="(level, levelKey) in classData.levels"
          v-bind:key="levelKey"
        >
          <div class="level-wrapper">
            <span class="level-tag">{{ level.level }}</span>
          </div>

          <div class="features-wrapper">
            <div class="enhancements-wrapper" v-if="level.enhancements">
              <a
                v-for="(item, itemKey) in enhancements(level.enhancements)"
                v-bind:key="itemKey"
                class="enhancement"
                :href="`#${item.value}`"
              >
                {{ item.value }}
              </a>
            </div>

            <class-feature
              v-for="(feature, featureKey) in features(level.features)"
              v-bind:key="featureKey"
              :feature="feature"
            ></class-feature>
          </div>
        </section>
      </main>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";
import ClassSwitcher from "@/components/ClassSwitcher.vue";
import ClassFeature from "@/components/class/Feature.vue";
import Markdown from "@/components/Markdown.vue";
import ClassTable from "@/components/class/ClassTable.vue";
import axios from "axios";

import { CFeature, CEnhancement } from "@/models/ClassData.ts";
import NavListClasses from "@/components/view/NavListClasses.vue";

@Component({
  components: {
    NavListClasses,
    ViewHeader,
    ViewRoot,
    ClassSwitcher,
    ClassFeature,
    Markdown,
    ClassTable,
  },
})
export default class ClassView extends Vue {
  classData: any = null;
  subclass = "";

  @Watch("$route.params.class", { deep: true })
  onClassChanged(val: string): void {
    this.fetchClass(val);
  }

  enhancements(unfiltered: []): CEnhancement[] {
    return unfiltered.filter((enhancement: CEnhancement, index, array) => {
      return enhancement.class == "base" || enhancement.class == this.subclass;
    });
  }

  features(unfiltered: []): CFeature[] {
    return unfiltered.filter((feature: CFeature, index, array) => {
      return feature.class == "base" || feature.class == this.subclass;
    });
  }

  mounted(): void {
    /**
     *
     */
    this.fetchClass(this.$route.params.class);
  }

  fetchClass(className: string): void {
    /**
     * Fetches the class data for className from the server
     */
    axios
      .get(`/static/json/classes/${className}.json`)
      .then((response) => (this.classData = response.data))
      .catch((error) => {
        console.error("Error!", error.message);
        this.classData = null;
      });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/buttons.css";
@import "../../assets/scss/colours.scss";

$max-width: 796px;

@mixin meta-block() {
  width: calc(100% - 32px);
  max-width: $max-width;

  margin: 16px auto 0px auto;

  border-radius: 4px;
  border: 1px solid #ababab;
}

#subclass-switcher {
  @include meta-block();

  padding: 8px 12px;

  &:after {
    content: "ab";
  }
}

#class-table {
  @include meta-block();
  display: block;
}

#main {
  margin: 16px auto;
  padding: 16px;

  border: 1px solid #ababab;
  border-radius: 16px;

  box-sizing: border-box;
  width: 100%;
  max-width: $max-width;

  .level-group {
    display: flex;
    flex-direction: row;

    padding: 16px 0px;

    &:not(:last-child) {
      border-bottom: 2px solid $accent;
    }

    .level-wrapper {
      width: 48px;
      padding: 0px 8px;
      flex-grow: 0;
      flex-shrink: 0;

      .level-tag {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;

        padding: 4px 8px;
        width: 40px;

        border-radius: 4px;
        font-weight: bold;

        color: white;
        background-color: $accent;
      }
    }
    .features-wrapper {
      text-align: start;
      .enhancements-wrapper {
        .enhancement {
          display: inline-block;
          padding: 4px 8px;
          border: 1px solid #ababab;
          border-radius: 4px;
          text-decoration: none;
          color: inherit;
        }
        *:not(:last-child) {
          margin-right: 4px;
        }
      }
    }
  }

  @media screen and (max-width: $max-width) {
    & {
      border: none;
    }
  }
}

.header-button {
  font-size: 12px;
}

#portal {
  height: 100%;
}
</style>
