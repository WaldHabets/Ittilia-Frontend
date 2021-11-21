<template>
  <view-root>
    <template v-slot:header>
      <view-header />
    </template>
    <template v-slot:content>
      <main>
        <details>
          <summary class="main-group">Magiërs</summary>
          <p>
            Iedereen in de Yxon, wel bijna iedereen, wordt geboren met de
            inherente vaardigheid om magie te beoefenen. De meeste personen
            kennen dan ook een truk of twee
          </p>
        </details>

        <details>
          <summary class="sub-group">Arcanisten</summary>
          <portal-class-card
            text="Artificer"
            href="/classes/artificer"
            background="/static/img/classes/bg/class01.jpg"
          />
          <portal-class-card
            text="Wizard"
            href="/classes/wizard"
            background="/static/img/classes/bg/class02.jpg"
          />
          <portal-class-card
            text="Bard"
            href="/classes/bard"
            background="/static/img/classes/bg/class07.jpg"
          />
          <portal-class-card
            text="Sorcerer"
            href="/classes/sorcerer"
            background="/static/img/classes/bg/class06.jpg"
          />

          <p>
            Arcanisten in Ittilia zijn zij die hun tijn ten volle toewijden aan
            het bestuderen en beoefenen van magie; als er namelijk één waarheid
            is doorheen de Yxon, dan is het dat magie gelijk staat aan macht. De
            studie van magie is de meest directe route naar macht. Ongeacht de
            manier waarop men gebruik wilt maken van magie, men kan niet om het
            feit dat men met hun neus in de boeken zal moeten zitten.
          </p>
          <p>
            Hoewel 5e verscheidene magische rollen aanbiedt, kent men deze
            verschillen niet in Ittilia. Een arcanist is een arcanist, ongeacht
            of de achterliggende rol artificer, wizard, bard of sorcerer is.
            Iedereen wordt geboren met de vaardigheid om magie te gebruiken.
            Allen zullen moeten leren en oefenen om dit goed te doen. Het komt
            niet natuurlijker tot een sorcerer als dat het tot een tovernaar zou
            komen. Het verschil ligt eerder in waar men tijdens de studie op
            focust.
          </p>
          <p>
            Een tovenaar (wizard) hongert naar kennis: om zo veel en zo krachtig
            mogelijke spreuken te leren. Ze proberen steeds om nieuwe spreuken
            te vinden en te ontwikkelen. Voor een tovenaar is meer beter. Een
            sorcerer legt zijn focus op het dieper begrijpen van de magie, om er
            absolute controle over te hebben en om het te buigen naar hun wil,
            meer dan een andere arcanist dat zou kunnen. De bard daarintegen is
            minder gierig. Dit zijn arcanisten die de schoonheid in magie zien,
            en ze daarom proberen te verzoenen met andere aspecten van het
            leven. Meestal in kunstvormen. Hun focus is naar buiten gericht, om
            magie toe te passen om andere levens gelukkiger te maken. Een
            artificer is het hier in zekere zin mee eens: hun studie is niet
            zozeer gericht op de magie zelf, maar de vereniging ervan met andere
            objecten. Hoewel iedere arcanist in staat is op magische items te
            ontwikkelen, kan men moeilijk evenaren met de kennis die een
            artificer heeft in dit onderwerp. Hun onderzoek is niet enkel
            gefocust op de magie, maar ook op hoe men objecten en apparatus van
            de grond af aan kan ontwikkelen met het doel ze te binden met magie.
          </p>
        </details>

        <details>
          <summary class="main-group">Druïden</summary>
          <portal-class-card
            text="Druid"
            href="/classes/druid"
            background="/static/img/classes/bg/class09.jpg"
          />
          <portal-class-card
            text="Cleric"
            href="/classes/cleric"
            background="/static/img/classes/bg/class04.jpg"
          />

          <p>
            Druïden in Ittilia vervullen velen belangrijke rollen, meestal
            religieus. In tegenstelling tot elke andere rol, kan men er niet
            voor kiezen om een druïde te worden. Een druïde is iemand die
            geboren wordt met een zeer diepe en zuivere connectie met de wereld
            rondom hun, in dezelfde manier waarop de Yxothri gelinked zijn met
            de wereld.
          </p>
          <p>
            Druïdencirkels zijn altijd opzoek naar nieuwgeborene met een
            druïdische link. Ze zetten hun oracles in om te voorspellen waar en
            kind geboren wordt, om het, zodra het geboren is, weg te halen bij
            hun ouders en op te voeden in de druïdische tempels. Het is niet
            ongewoon dat verschillende tempels een kind proberen op te eisen,
            wat nu en dat tot conflicten kan leiden.
          </p>
          <p>
            De diepe link met de natuur en de cosmos stelt druïden in staat
            verschillende rollen te vervullen, en duwt ze gewoonlijk in een
            religieuse positie. Gewoonlijk vind men minstens één druïde per
            dorp, die de balseming doet, als heler werkt, bescherming dient te
            bieden tegen ondoden of onnatuurlijke en vele andere zaken.
          </p>
        </details>

        <details>
          <summary class="main-group">Scholen van Oorlog</summary>
          <portal-class-card
            text="Barbarian"
            href="/classes/barbarian"
            background="/static/img/classes/bg/class13.jpg"
          />
          <portal-class-card
            text="Fighter"
            href="/classes/fighter"
            background="/static/img/classes/bg/class05.jpg"
          />
          <portal-class-card
            text="Paladin"
            href="/classes/paladin"
            background="/static/img/classes/bg/class14.jpg"
          />
          <p>TODO</p>
        </details>

        <details>
          <summary class="main-group">Overige</summary>
          <portal-class-card
            text="Monk"
            href="/classes/monk"
            background="/static/img/classes/bg/class11.jpg"
          />
          <portal-class-card
            text="Ranger"
            href="/classes/ranger"
            background="/static/img/classes/bg/class08.jpg"
          />
          <portal-class-card
            text="Rogue"
            href="/classes/rogue"
            background="/static/img/classes/bg/class10.jpg"
          />
          <portal-class-card
            text="Warlock"
            href="/classes/warlock"
            background="/static/img/classes/bg/class12.jpg"
          />
          <p>TODO</p>
        </details>
      </main>
    </template>
  </view-root>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PortalClassCard from "@/components/portal/PortalClassCard.vue";
import ViewHeader from "@/components/view/ViewHeader.vue";
import ViewRoot from "@/components/view/ViewRoot.vue";

@Component({
  components: {
    PortalClassCard,
    ViewHeader,
    ViewRoot,
  },
})
export default class PortalClasses extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/scss/details.scss";

main {
  box-sizing: border-box;
  padding: 16px;

  details {
    @include details-base;

    p {
      margin: 16px 8px;
    }
  }
}
</style>
