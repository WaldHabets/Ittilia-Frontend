import L, { DomUtil } from "leaflet";
import { mdiMapLegend } from "@mdi/js";

const path: string = mdiMapLegend;
const domCollapse =
  '<svg viewBox="0 0 24 24">' + `<path d="${mdiMapLegend}" />` + "</svg>";

const domExpanded =
  "<h4>Legende</h4>" +
  '<div style="background: #697d4f"><span>Oerwoud</span></div>' +
  '<div style="background: #b2c29d"><span style="color: black;">Bossen en struikgewassen</span></div>' +
  '<div style="background: #b5bfb5"><span style="color: black;">Steppe, heide of tundra</span></div>' +
  '<div style="background: #deddbe"><span style="color: black;">Grasland of Savannah</span></div>' +
  '<div style="background: #D1A354"><span>Gecultiveerd land</span></div>' +
  '<div style="background: #804f2e"><span>Bergflora</span></div>' +
  '<div style="background: #63a286"><span>Moeraslanden</span></div>' +
  '<div style="background: #f7f6f1"><span style="color: black;">Woestijn</span></div>' +
  '<div style="background: #ffffff"><span style="color: black;">Ijsvlakten</span></div>';

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
