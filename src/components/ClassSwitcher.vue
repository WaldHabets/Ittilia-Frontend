<template>
  <select class="header-dropdown" v-model="selected">
    <option value="artificer">Artificer</option>
    <option value="wizard">Wizard</option>
    <option value="bard">Bard</option>
    <option value="cleric">Cleric</option>
    <option value="sorcerer">Sorcerer</option>
    <option value="druid">Druid</option>
    <option value="shaman">Shaman</option>
    <option value="barbarion">Barbarion</option>
    <option value="fighter">Fighter</option>
    <option value="paladin">Paladin</option>
    <option value="monk">Monk</option>
    <option value="ranger">Ranger</option>
    <option value="rogue">Rogue</option>
    <option value="warlock">Warlock</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class ClassSwitcher extends Vue {
    private selected: string = this.$route.params.class;

    @Watch("selected")
    onRouteChanged(val: string, oldVal: string) {
        this.$router.replace(`/ittilia/classes/${this.selected}`);
    }
}
</script>

<style lang="scss">
@import "./header.components.scss";
</style>
