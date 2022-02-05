<template>
  <ul id="root-list">
    <li>
      <router-link class="nav-link sub-link" to="/classes/artificer/">
        Artificer
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/wizard/">
        Wizard
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/bard/">
        Bard
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/cleric/">
        Cleric
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/sorcerer/">
        Sorcerer
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/barbarian/">
        Barbarian
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/fighter/">
        Fighter
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/paladin/">
        Paladin
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/monk/">
        Monk
      </router-link>
      <router-link class="nav-link sub-link" to="/classes/ranger/">
        Ranger
      </router-link>
      <router-link class="nav-link sub-link" to="/ittilia/classes/rogue/">
        Rogue
      </router-link>
      <router-link class="nav-link sub-link" to="/ittilia/classes/warlock/">
        Warlock
      </router-link>
      <router-link class="nav-link sub-link" to="/ittilia/classes/druid/">
        Druid
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavListClasses extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/navlist";
</style>
