import L, { DomUtil } from "leaflet";
import { mdiRuler, mdiCancel } from "@mdi/js";

const htmlRuler =
  '<svg viewBox="0 0 24 24">' + `<path d="${mdiRuler}" />` + "</svg>";

const htmlClear =
  '<svg viewBox="0 0 24 24">' + `<path d="${mdiCancel}" />` + "</svg>";

function createButton(
  html: string,
  title: string,
  className: string,
  container: HTMLDivElement
): HTMLAnchorElement {
  const link = DomUtil.create("a", className, container);
  link.innerHTML = html;
  link.href = "#";
  link.title = title;

  /*
   * Will force screen readers like VoiceOver to read this as "Zoom in - button"
   */
  link.setAttribute("role", "button");
  link.setAttribute("aria-label", title);

  L.DomEvent.disableClickPropagation(link);
  L.DomEvent.on(link, "click", L.DomEvent.stop);

  return link;
}

export default function createDistanceTool(
  onToggle: (e: Event, a: HTMLAnchorElement) => void,
  onClear: L.DomEvent.EventHandlerFn
): L.Control {
  const legend = new L.Control({ position: "topleft" });

  legend.onAdd = (map: L.Map): HTMLElement => {
    const className = "leaflet-control-ruler";
    const container = L.DomUtil.create("div", className);

    container.setAttribute("aria-haspopup", "false");

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    const buttonToggle = createButton(
      htmlRuler,
      "Ruler",
      className + "-ruler",
      container
    );
    L.DomEvent.on(buttonToggle, "click", (e: Event) => {
      onToggle(e, buttonToggle);
    });
    const buttonClear = createButton(
      htmlClear,
      "Clear",
      className + "-clear",
      container
    );
    L.DomEvent.on(buttonClear, "click", onClear);

    return container;
  };

  return legend;
}
