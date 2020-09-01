import React, { useEffect } from "react";
import styled from "styled-components";

import { ThumbailConfig } from "../types";

const SVG_NS = "http://www.w3.org/2000/svg";

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
interface ThumbnailProps {
  config: ThumbailConfig;
}
const getFontUnit = (size: number) => {
  return `${size}px`;
};
const Thumbnail: React.FC<ThumbnailProps> = ({ config }) => {
  const { width, height, fontFamily } = config;
  const renderChannel = () => {
    const {
      backgroundColor,
      fontSize,
      fontColor,
      fontFamily,
      text,
    } = config.channel;
    setTimeout(() => {
      const ele = document.querySelector("#text-channel") as SVGTextElement;

      console.log(ele.getBBox());
    }, 2000);
    return (
      <g>
        <rect
          style={{ fill: backgroundColor }}
          width="275"
          height="34"
          x="0"
          y="20"
        />
        <text
          x="20"
          y="47"
          id="text-channel"
          fontSize={getFontUnit(fontSize)}
          fill={fontColor}
          fontWeight={"bold"}
          fontFamily={fontFamily}
        >
          {text.toUpperCase()}
        </text>
      </g>
    );
  };
  const renderTopic = () => {
    const {
      backgroundColor,
      fontSize,
      fontColor,
      fontFamily,
      y,
      text,
    } = config.topic;

    return (
      <g>
        <text x="300" y="77" style={{ fill: fontColor, fontFamily }}>
          {text.map((name, index) => (
            <tspan
              x={width - (name.length * fontSize) / 2}
              y={y + index * fontSize * 2}
              fontSize={getFontUnit(fontSize)}
            >
              {name}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  const renderChapter = () => {
    const {
      backgroundColor,
      fontSize,
      fontColor,
      fontFamily,
      text,
    } = config.chapter;

    const { y, fontSize: topicFontSize, text: topicNames } = config.topic;

    setTimeout(() => {
      const rect = document.querySelector("#chapter-rec") as SVGTextElement;
      const ele = document.querySelector("#text-chapter") as SVGTextElement;
      const box = ele.getBBox();
      console.log();
      rect.setAttribute("width", box.width + "");
      rect.setAttribute("height", box.height + "");
    }, 2000);

    return (
      <g>
        <rect
          style={{ fill: backgroundColor }}
          width="275"
          height="40"
          x="300"
          y={y + 30 + topicNames.length * topicFontSize}
          id="chapter-rec"
        />
        <text
          x="300"
          y={y + 30 + topicNames.length * topicFontSize + fontSize}
          fontSize={getFontUnit(fontSize)}
          fill={fontColor}
          fontFamily={fontFamily}
          fontWeight={"bold"}
          id="text-chapter"
        >
          {text.toUpperCase()}
        </text>
      </g>
    );
  };

  const renderSubject = () => {
    const {
      backgroundColor,
      fontSize,
      fontColor,
      fontFamily,
      text,
    } = config.subject;

    const { y, fontSize: topicFontSize, text: topicNames } = config.topic;
    return (
      <g>
        <rect
          style={{ fill: backgroundColor }}
          width="150"
          height="40"
          x={width - 150 - 20}
          y={y + 110 + topicNames.length * topicFontSize}
        />
        <text
          x={width - 150 + 20}
          y={y + 110 + topicNames.length * topicFontSize + fontSize}
          fontSize={getFontUnit(fontSize)}
          fill={fontColor}
          fontFamily={fontFamily}
          fontWeight={"bold"}
          style={{
            textTransform: "uppercase",
          }}
        >
          {text.toUpperCase()}
        </text>
      </g>
    );
  };

  const renderBackground = () => {
    const { backgroundColor, x, y } = config;
    return (
      <g>
        <rect
          style={{ fill: backgroundColor }}
          width={width}
          height={height}
          x={x}
          y={y}
        />
      </g>
    );
  };
  const renderImage = () => {
    const {x,y,width,height,href} = config.image;
    return (
      <g>
        <image x={x} y={y} width={width} height={height}href={href} />
      </g>
    );
  };
  useEffect(() => {
    const textElem = document.createElementNS(SVG_NS, "text");
    textElem.textContent = "Test";
    textElem.setAttribute("font-size", "19");
    const svg = document.querySelector("#svg");
    if (svg) {
      svg.appendChild(textElem);
      console.log("textElem", textElem.getBBox());
    }
  }, [config]);
  return (
    <ThumbnailWrapper id="capture">
      <svg
        width="1920"
        height="1020"
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: "auto", fontFamily }}
        fontFamily={fontFamily}
        id="svg"
      >
        {renderBackground()}
        {renderChannel()}
        {renderImage()}
        {renderTopic()}
        {renderChapter()}
        {renderSubject()}
      </svg>
    </ThumbnailWrapper>
  );
};
export default Thumbnail;
