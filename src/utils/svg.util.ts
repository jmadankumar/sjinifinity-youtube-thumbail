import { SvgShape } from "../types";

const SVG_NS = "http://www.w3.org/2000/svg";

function createRect(shape: SvgShape): SVGRectElement {
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("x", shape.x + "");
  rect.setAttribute("y", shape.y + "");
  rect.setAttribute("width", shape.width + "");
  rect.setAttribute("height", shape.height + "");
  return rect;
}

function createImage(shape: Svg): SVGImageElement {
  const image = document.createElementNS(SVG_NS, "image");
  image.setAttribute("x", shape.x + "");
  image.setAttribute("y", shape.y + "");
  image.setAttribute("width", shape.width + "");
  image.setAttribute("height", shape.height + "");
  image.setAttribute("href", shape.href);
  return image;
}
