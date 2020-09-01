import { CSSProperties } from "styled-components";

export type SvgTextShape = SvgShape & {
  fontColor: string;
  fontSize: number;
  fontFamily: string;
  text: string | Array<string>;
  paddingX?: number;
  paddingY?: number;
  fontWeight: string;
};
export interface SvgShape {
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor?: string;
}
export type SvgImageShape = SvgShape & {
  href: string;
};

export type ThumbailConfig = SvgShape & {
  backgroundColor: string;
  fontFamily: string;
  channel: SvgTextShape;
  subject: SvgTextShape;
  chapter: SvgTextShape;
  topic: SvgTextShape;
  image: SvgImageShape;
};
