export interface SvgTextShape {
  x: number;
  y: number;
  fontColor: string;
  fontSize: number;
  fontFamily: string;
  backgroundColor: string;
  text: string | Array<string>;
}
export interface SvgShape {
  x: number;
  y: number;
  width: number;
  height: number;
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
