import L, { DomUtil } from "leaflet";
import { mdiMapLegend } from "@mdi/js";

const domCollapse =
  '<svg viewBox="0 0 24 24">' + `<path d="${mdiMapLegend}" />` + "</svg>";

const domExpanded =
  "<h4>Legende</h4>" +
  '<div class="legend-entry-01"><span>Oerwoud</span></div>' +
  '<div class="legend-entry-02"><span>Bossen en struikgewassen</span></div>' +
  '<div class="legend-entry-03"><span>Steppe, heide of tundra</span></div>' +
  '<div class="legend-entry-04"><span>Grasland of Savannah</span></div>' +
  '<div class="legend-entry-05"><span>Gecultiveerd land</span></div>' +
  '<div class="legend-entry-06"><span>Hoge Bergflora (2500m+)</span></div>' +
  '<div class="legend-entry-07"><span>Moeraslanden</span></div>' +
  '<div class="legend-entry-08"><span>Woestijn</span></div>' +
  '<div class="legend-entry-09"><span>Ijsvlakten</span></div>';

function onAdd(map: L.Map): HTMLElement {
  //var legend = new L.Control({ position: "bottomleft" });

  const className = "leaflet-control-legend";
  const container = L.DomUtil.create("div", className);

  container.setAttribute("aria-haspopup", "true");

  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.disableScrollPropagation(container);

  const toggleButton = L.DomUtil.create("a", className + "-toggle", container);
  const contentExpanded = L.DomUtil.create("section", className + "-section");

  toggleButton.innerHTML = domCollapse;
  contentExpanded.innerHTML = domExpanded;

  toggleButton.style.display = "block";
  contentExpanded.style.display = "none";

  const expand = function () {
    L.DomUtil.addClass(container, "leaflet-control-layers-expanded");

    toggleButton.style.display = "none";
    contentExpanded.style.display = "block";

    contentExpanded.style.height = "";

    const acceptableHeight = map.getSize().y - (container.offsetTop + 50);
    if (acceptableHeight < contentExpanded.clientHeight) {
      DomUtil.addClass(contentExpanded, "leaflet-control-layers-scrollbar");
      contentExpanded.style.height = acceptableHeight + "px";
    } else {
      DomUtil.removeClass(contentExpanded, "leaflet-control-layers-scrollbar");
    }
  };

  L.DomEvent.on(container, {
    mouseenter: function () {
      L.DomEvent.on(contentExpanded, "click", L.DomEvent.preventDefault);

      expand();

      setTimeout(function () {
        L.DomEvent.off(contentExpanded, "click", L.DomEvent.preventDefault);
      });
    },
    mouseleave: function () {
      DomUtil.removeClass(container, "leaflet-control-layers-expanded");
      toggleButton.style.display = "block";
      contentExpanded.style.display = "none";
    },
  });

  L.DomEvent.on(toggleButton, "click", L.DomEvent.preventDefault);
  L.DomEvent.on(toggleButton, "focus", expand);

  container.appendChild(contentExpanded);

  return container;
}

export default function createLegend(): L.Control {
  const legend = new L.Control({ position: "topleft" });

  legend.onAdd = onAdd;

  return legend;
}
