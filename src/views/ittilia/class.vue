<template>
  <view-root>
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

    <template v-slot:content>
      <select id="subclass-switcher" v-if="classData">
        <option :value="null">No Subclass</option>
        <option
          v-for="(subclass, key) in classData.subclasses"
          :key="key"
          :value="subclass.value"
        >
          {{ subclass.text }}
        </option>
      </select>

      <side v-if="classData" id="class-table">
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
              <th>15</th>
              <th>16</th>
              <th>17</th>
              <th>18</th>
              <th>19</th>
              <th>20</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, tableKey) in classData.table" :key="tableKey">
              <td>{{ row.name }}</td>
              <td v-for="(value, rowKey) in row.values" :key="rowKey">
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </side>

      <main :id="`${$route.params.class}-main`" v-if="classData">
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
                v-for="(item, itemKey) in level.enhancements"
                v-bind:key="itemKey"
                class="enhancement"
                :href="`#${item}`"
              >
                {{ item }}
              </a>
            </div>

            <class-feature
              v-for="(feature, featureKey) in level.features"
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
import axios from "axios";

@Component({
  components: {
    ViewHeader,
    ViewRoot,
    ClassSwitcher,
    ClassFeature,
    Markdown,
  },
})
export default class ClassView extends Vue {
  classData: any = null;

  @Watch("$route.params.class", { deep: true })
  onClassChanged(val: string, oldVal: string): void {
    this.fetchClass(val);
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

<style lang="scss">
@import "../../scss/buttons.css";
@import "../../scss/colours.scss";

#subclass-switcher {
  width: 100%;
  max-width: 796px;

  margin: 16px auto 0px auto;

  padding: 8px 12px;

  border-radius: 4px;
  border: 1px solid #ababab;

  &:after {
    content: "ab";
  }
}

#class-table {
  display: block;

  margin: 16px auto 0px auto;
  max-width: 796px;

  border-radius: 4px;
  border: 1px solid #ababab;

  text-align: right;

  table {
    width: 100%;
  }
}

@mixin main($color) {
  margin: 16px auto;
  padding: 16px;

  border: 1px solid #ababab;
  border-radius: 16px;

  box-sizing: border-box;
  width: 100%;
  max-width: 796px;

  .level-group {
    display: flex;
    flex-direction: row;

    padding: 16px 0px;

    &:not(:last-child) {
      border-bottom: 2px solid $color;
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

        background-color: $color;
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
}

#barbarian-main {
  @include main($class06);
}

#fighter-main {
  @include main($class05);
}

#bard-main {
  @include main($class07);
}

#ranger-main {
  @include main($class08);
}

.header-button {
  font-size: 12px;
}

#portal {
  height: 100%;
}
</style>
