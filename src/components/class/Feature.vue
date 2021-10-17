<template>
  <section class="feature">
    <h1 :id="feature.name">
      {{ feature.name }}
    </h1>

    <markdown :src="feature.description" />

    <div class="progression-wrapper" v-if="feature.progression">
      <table class="progression">
        <thead>
          <tr>
            <th
              v-for="(head, headKey) in feature.progression.columns"
              v-bind:key="headKey"
            >
              {{ head }}
            </th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(row, rowKey) in feature.progression.values">
            <tr v-bind:key="rowKey">
              <td>{{ row.level }}</td>
              <td>{{ row.value }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Markdown from "@/components/Markdown.vue";

@Component({
  components: {
    Markdown,
  },
})
export default class ClassFeature extends Vue {
  @Prop(Object) private readonly feature!: any;
}
</script>

<style lang="scss">
.feature {
  display: grid;
  grid-template:
    "title title"
    "value table";

  @media screen and (max-width: 512px) {
    & {
      grid-template:
        "title"
        "value"
        "table";

      .progression-wrapper {
        margin-bottom: 8px;
        font-size: small;
      }
    }
  }

  column-gap: 16px;

  h1 {
    grid-area: title;
    margin-top: 0px;
    border-bottom: 1px solid #ababab;
    font-size: 24px;
  }

  section {
    grid-area: value;

    p,
    ul {
      font-size: 14px;
      text-align: justify;
      margin-top: 0px;
    }
  }

  .progression-wrapper {
    grid-area: table;
    .progression {
      border: 1px solid #ababab;
      padding: 4px;

      border-collapse: collapse;

      thead {
        border-bottom: 2px solid grey;
      }

      td,
      th {
        border: none;
        text-align: center;
        padding: 4px 8px;
      }
    }
  }
}
</style>
