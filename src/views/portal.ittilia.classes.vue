<template>
  <view-root>
  <template v-slot:header>
    <view-header/>
  </template>
  <template v-slot:content>
    <main>
    <portal-root id="wrapper">
      <details>
        <summary class="main-group">Scholen van Magie</summary>
        <p>
          Iedereen in Ittilia wordt geboren met een band met het arcane. Als
          beoefenaar van een magische school ben je volledig toegewijd aan
          oefening en studie om het maximale uit deze magie te halen.
        </p>
      </details>

      <details>
        <summary class="sub-group">Arcanist</summary>
        <p>Een</p>
      </details>
      <portal-class-card
        text="Arcanist: Artificer"
        href="/ittilia/classes/artificer"
        background="/static/img/classes/bg/class01.jpg"
      />
      <portal-class-card
        text="Arcanist: Wizard"
        href="/ittilia/classes/wizard"
        background="/static/img/classes/bg/class02.jpg"
      />

      <details>
        <summary class="sub-group">Magiër</summary>
        <p>
          In Ittilia is er geen concept van Bard, Cleric of Sorcerer. Dit alles
          is gewoon een magiër. De klassen zijn behouden puur voor mechanise
          redenen.
        </p>
        <p>
          Een magiër verschilt in werkelijkheid niet veel van een arcanist. Ze
          moeten nog altijd studeren en oefenen om nieuwe spreuken te leren.
        </p>
      </details>
      <portal-class-card
        text="Magiër: Bard"
        href="/ittilia/classes/bard"
        background="/static/img/classes/bg/class07.jpg"
      />
      <portal-class-card
        text="Magiër: Cleric"
        href="/ittilia/classes/cleric"
        background="/static/img/classes/bg/class04.jpg"
      />
      <portal-class-card
        text="Magiër: Sorcerer"
        href="/ittilia/classes/sorcerer"
        background="/static/img/classes/bg/class06.jpg"
      />

      <details>
        <summary class="main-group">Scholen van Religie</summary>
        <p>
          Men kan niet studeren om een Druïde of Shaman te worden. Je moet
          hiermee geboren zijn. Als je lid bent van een school van religie dan
          heb je een speciale gave en link met de Yxon.
        </p>
      </details>
      <portal-class-card
        text="Religie: Druid"
        href="/ittilia/classes/druid"
        background="/static/img/classes/bg/class09.jpg"
      />
      <portal-class-card
        text="Religie: Shaman"
        href="/ittilia/classes/shaman"
        background="/static/img/classes/bg/class03.jpg"
      />

      <details>
        <summary class="main-group">Scholen van Oorlog</summary>
        <p>TODO</p>
      </details>
      <portal-class-card
        text="Barbarian"
        href="/ittilia/classes/barbarian"
        background="/static/img/classes/bg/class13.jpg"
      />
      <portal-class-card
        text="Fighter"
        href="/ittilia/classes/fighter"
        background="/static/img/classes/bg/class05.jpg"
      />
      <portal-class-card
        text="Paladin"
        href="/ittilia/classes/paladin"
        background="/static/img/classes/bg/class14.jpg"
      />

      <details>
        <summary class="main-group">Overige</summary>
        <p>TODO</p>
      </details>
      <portal-class-card
        text="Monk"
        href="/ittilia/classes/monk"
        background="/static/img/classes/bg/class11.jpg"
      />
      <portal-class-card
        text="Ranger"
        href="/ittilia/classes/ranger"
        background="/static/img/classes/bg/class08.jpg"
      />
      <portal-class-card
        text="Rogue"
        href="/ittilia/classes/rogue"
        background="/static/img/classes/bg/class10.jpg"
      />
      <portal-class-card
        text="Warlock"
        href="/ittilia/classes/warlock"
        background="/static/img/classes/bg/class12.jpg"
      />
    </portal-root>
    </main>
  </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PortalClassCard from "@/components/portal/PortalClassCard.vue";
import PortalRoot from "@/components/portal/PortalRoot.vue";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";

@Component({
  components: {
    PortalClassCard,
    PortalRoot,
    ViewHeader,
    ViewRoot,
  },
})
export default class PortalClasses extends Vue {}
</script>

<style lang="scss">
main {
  box-sizing: border-box;
  padding: 16px;

  details {
    grid-column: 1/-1;
    color: #282828;
    width: 100%;
    max-width: 664px;
    margin: auto;

    summary.main-group {
      box-sizing: border-box;
      padding: 8px;
      font-size: 24px;
      font-weight: 900;
      color: #282828;
      border-bottom: 1px solid white;
      width: 100%;
      text-align: start;
    }

    p {
      box-sizing: border-box;
      width: 100%;
      max-width: 664px;
    }
  }
}
</style>
