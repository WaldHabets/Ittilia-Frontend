<template>
  <div
    id="leaflet-map"
    style="width: 100%; height: 100%; text-align: start"
  ></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import L from "leaflet";
import Landmark from "@/models/Landmark.ts";
import axios from "axios";
import { createLocationMarker, createWaypointMarker } from "./LeafletUtils";
import createLegend from "./LeafletLegend";
import createDistanceTool from "./LeafletDistanceTool";

let factorx = 0.000036364;
let factory = 0.000036364;

let customCRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  // 1 px on a 7424x7424 map = 1,85208331km
  // 1 px on a 500x500 map   = 27,499732987km (1.85.. x 7424/500)
  // 500px = 13749.8664935km ()
  // scale == 500 / 13749.86... = 0.036363989
  transformation: new L.Transformation(-factorx, 0, factory, 0),
  // Scale, zoom and distance are entirely unchanged from CRS.Simple
  scale: function (zoom: number) {
    return Math.pow(2, zoom);
  },

  zoom: function (scale: number) {
    return Math.log(scale) / Math.LN2;
  },

  distance: function (latlng1: L.LatLng, latlng2: L.LatLng) {
    var dx = latlng2.lng - latlng1.lng,
      dy = latlng2.lat - latlng1.lat;

    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true,
});

@Component
export default class Leaflet extends Vue {
  private readonly dimensionInMeters = 13749866.4935;
  private readonly zoom = 0;
  private readonly center = L.latLng(
    this.dimensionInMeters / 2,
    this.dimensionInMeters / 2
  );
  private readonly url = "/static/img/tiles/base/{z}/{x}_{y}.png";
  private readonly attribution =
    "&copy; <a href='https://waldhabets.eu'>Wald Habets</a>";

  private _map!: L.Map;

  private trackWaypoints = false;
  private waypoints: L.LatLng[] = [];
  private waypointLayer: L.Layer[] = [];

  clearWaypoints(): void {
    this.waypoints.length = 0;
    this.clearWaypointLayer();
  }

  clearWaypointLayer(): void {
    this.waypointLayer.forEach((item: L.Layer) => {
      item.remove();
    });
    this.waypointLayer.length = 0;
  }

  redrawWaypoints(): void {
    const numwaypoints: number = this.waypoints.length;

    if (numwaypoints == 0) {
      return;
    }

    this.clearWaypointLayer();

    // Draw the polyline
    if (numwaypoints > 1) {
      const line = L.polyline(this.waypoints, { color: "red" });
      this.waypointLayer.push(line);
      line.addTo(this._map);
    }

    if (numwaypoints == 1) {
      this.drawSingleWaypoint(this.waypoints[0], 0);
    } else {
      this.drawSingleWaypoint(this.waypoints[0], 0);
      let sum = 0;
      for (let i = 1; i < numwaypoints; ++i) {
        sum += this._map.distance(this.waypoints[i - 1], this.waypoints[i]);
      }
      this.drawSingleWaypoint(this.waypoints[numwaypoints - 1], sum);
    }
  }

  drawSingleWaypoint(waypoint: L.LatLng, label: number) {
    const marker = createWaypointMarker(waypoint, label);
    this.waypointLayer.push(marker);
    marker.addTo(this._map);
  }

  createMarkers(data: Landmark[], map: L.Map): void {
    let cities: L.Marker[] = [];
    let landmarks: L.Marker[] = [];

    data.forEach((landmark: Landmark) => {
      let marker = createLocationMarker(landmark);

      switch (landmark.type) {
        case "city":
          cities.push(marker);
          break;
        case "landmark":
          landmarks.push(marker);
          break;
        default:
          break;
      }
    });

    let cityMarkersGroup = L.layerGroup(cities);
    let landmarkMarkerGroup = L.layerGroup(landmarks);

    let overlays = {
      Steden: cityMarkersGroup,
      "Markante Sites": landmarkMarkerGroup,
    };

    L.control
      .layers(undefined, overlays, {
        position: "topleft",
      })
      .addTo(map);
  }

  mounted(): void {
    let map = L.map("leaflet-map", {
      scrollWheelZoom: true,
      crs: customCRS,
    }).setView(this.center, this.zoom);

    let mapBounds = new L.LatLngBounds(
      [0, -this.dimensionInMeters],
      [this.dimensionInMeters, 0]
    );
    map.fitBounds(mapBounds);
    map.setMaxBounds(mapBounds);

    L.tileLayer(this.url, {
      minZoom: 0,
      maxZoom: 8,
      //bounds: bounds,
      attribution: this.attribution,
      tileSize: 500,
      noWrap: true,
    }).addTo(map);

    L.control
      .scale({
        position: "bottomright",
        maxWidth: 200,
        metric: true,
        imperial: false,
      })
      .addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      if (this.trackWaypoints) {
        this.waypoints.push(e.latlng);
        this.redrawWaypoints();
      } else {
        console.log(e.latlng);
      }
    });

    axios
      .get(`/static/json/map/landmarks.json`)
      .then((response) => {
        this.createMarkers(response.data, map);
      })
      .catch((error) => {
        console.error("Error!", error.message);
      });

    createLegend().addTo(map);

    createDistanceTool(
      (e: Event, a: HTMLAnchorElement) => {
        this.trackWaypoints = !this.trackWaypoints;
        if (this.trackWaypoints) {
          L.DomUtil.addClass(a, "leaflet-control-button-active");
        } else {
          L.DomUtil.removeClass(a, "leaflet-control-button-active");
        }
      },
      (e: Event) => {
        this.clearWaypoints();
      }
    ).addTo(map);

    map.invalidateSize(true);

    this._map = map;
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/colours.scss";
@mixin leaflet-control() {
  border: 2px solid rgba(0, 0, 0, 0.2);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  background-color: #fff;
  border-radius: 5px;
}
@mixin leaflet-control-button() {
  box-sizing: border-box;
  width: 44px;
  height: 44px;

  padding: 8px;

  svg {
    fill: #b9b9b9;

    &:hover {
      fill: $accent;
    }
  }
}

.leaflet-div-icon {
  width: 0;
  height: 0;
  border: 0;
  padding: 0;
}
.map-waypoint-label {
  b {
    display: block;
    width: max-content;
    height: max-content;
    padding: 4px;

    @include leaflet-control();

    &:hover {
      opacity: 0;
    }
  }
}
.leaflet-control-legend {
  @include leaflet-control();

  .leaflet-control-legend-toggle {
    @include leaflet-control-button();
  }

  .leaflet-control-legend-section {
    h4 {
      text-align: center;
      font-size: 16px;
      margin: 2px 12px 8px;
    }
    div {
      font: 14px Arial, Helvetica, sans-serif;
      margin: 2px 4px;
      padding: 2px 4px;
      text-align: center;
      font-weight: bold;
    }
  }
}
.leaflet-control-ruler {
  @include leaflet-control();

  .leaflet-control-ruler-ruler {
    display: block;
    @include leaflet-control-button();
    &.leaflet-control-button-active {
      svg {
        fill: $accent;
      }
    }
  }
  .leaflet-control-ruler-clear {
    display: block;
    @include leaflet-control-button();
  }
}
</style>
