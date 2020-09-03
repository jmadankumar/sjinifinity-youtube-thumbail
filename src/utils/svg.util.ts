import { SvgShape, SvgImageShape, SvgTextShape } from "../types";

const SVG_NS = "http://www.w3.org/2000/svg";

export function createRect(shape: SvgShape): SVGRectElement {
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("x", shape.x + "");
  rect.setAttribute("y", shape.y + "");
  rect.setAttribute("width", shape.width + "");
  rect.setAttribute("height", shape.height + "");
  rect.setAttribute("fill", shape.backgroundColor);
  return rect;
}

export function createImage(shape: SvgImageShape): SVGImageElement {
  const image = document.createElementNS(SVG_NS, "image");
  image.setAttribute("x", shape.x + "");
  image.setAttribute("y", shape.y + "");
  image.setAttribute("width", shape.width + "");
  image.setAttribute("height", shape.height + "");
  image.setAttribute("href", shape.href);
  return image;
}

export function createText(
  shape: SvgTextShape,
  isEmpty: boolean = false
): SVGTextElement {
  const text = document.createElementNS(SVG_NS, "text");
  const paddingY = shape.paddingY ?? 0;
  text.setAttribute("x", shape.x + "");
  text.setAttribute("y", shape.y + shape.fontSize + paddingY + "");
  text.setAttribute("font-size", shape.fontSize + "");
  text.setAttribute("font-family", shape.fontFamily);
  text.setAttribute("font-weight", shape.fontWeight);
  text.setAttribute("fill", shape.fontColor);
  text.style.fontFamily = shape.fontFamily;
  text.style.fontSize = shape.fontSize + "px";
  text.style.fontWeight = shape.fontWeight;

  if (!isEmpty) {
    text.textContent = shape.text as string;
  }

  return text;
}

export function createGroup(): SVGGElement {
  const group = document.createElementNS(SVG_NS, "g");
  return group;
}

export function createTextSpan(
  shape: SvgTextShape,
  text: string
): SVGTSpanElement {
  const tspan = document.createElementNS(SVG_NS, "tspan");
  const paddingY = shape.paddingY ?? 0;
  tspan.setAttribute("y", shape.y + shape.fontSize + paddingY * 2 + "");
  tspan.setAttribute("font-size", shape.fontSize + "");
  tspan.setAttribute("font-family", shape.fontFamily);
  tspan.setAttribute("font-weight", shape.fontWeight);
  tspan.setAttribute("fill", shape.fontColor);
  tspan.textContent = text;
  tspan.style.fontFamily = shape.fontFamily;
  tspan.style.fontSize = shape.fontSize + "px";
  tspan.style.fontWeight = shape.fontWeight;

  return tspan;
}
