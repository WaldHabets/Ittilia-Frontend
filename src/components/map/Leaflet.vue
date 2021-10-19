<template>
    <div id="leaflet-map" style="width:100%;height:100%;">
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import L from "leaflet";

@Component
export default class Leaflet extends Vue {
    private zoom = 0;
    private center = [-250, 250];
    private url = "/static/img/tiles/base/{z}/{x}_{y}.png";
    private attribution = "&copy; <a href='https://waldhabets.eu'>Wald Habets</a>"

    mounted(): void {

        var map = L.map("leaflet-map", {
            minZoom: 0,
            maxZoom: 7,
            scrollWheelZoom: true,
            crs: L.CRS.Simple,
        }).setView(this.center, this.zoom);

        L.tileLayer(this.url, {
            attribution: this.attribution,
            tileSize: 500,
            noWrap: true,
        }).addTo(map);

        var bounds = [[-500,0], [0,500]];
        map.fitBounds(bounds);

        map.setMaxBounds(new L.LatLngBounds([-500,0], [0,500]));

        map.on('click', function(e) {
            console.log(e.latlng);
        });

        map.invalidateSize(true);

    }
}

</script>



<style>

</style>
