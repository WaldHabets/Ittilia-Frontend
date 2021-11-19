import L from "leaflet";
import Landmark from "@/models/Landmark";

export function createLocationMarker(landmark: Landmark): L.Marker {
  const marker = L.marker(L.latLng(landmark.latlng[0], landmark.latlng[1]));

  let markerHtml = "";
  if (landmark.wiki == "") markerHtml = `<b>${landmark.name}</b>`;
  else markerHtml = `<a href="${landmark.wiki}"><b>${landmark.name}</b></a>`;

  marker.bindPopup(markerHtml).openPopup();

  return marker;
}

function formatDistance(distance: number): string {
  let output = "";
  const km = distance / 1000;
  const m = (km - Math.floor(km)) * 1000;

  output += km > 0 ? km.toFixed(0) + "km" : "";
  output += m > 0 ? m.toFixed(0) + "m" : "";

  return output !== "" ? output : "0";
}

export function createWaypointMarker(
  waypoint: L.LatLng,
  label: number
): L.Marker {
  //const markerIcon = L.icon({iconUrl: "/static/img/crosshairs-gps.png", iconSize:[24,24]});
  const markerIcon = L.divIcon({
    className: "map-waypoint-label",
    html: `<b>${formatDistance(label)}</b>`,
    iconSize: [0, 0],
  });
  const marker = L.marker(waypoint, { icon: markerIcon });

  marker.openPopup();

  return marker;
}
