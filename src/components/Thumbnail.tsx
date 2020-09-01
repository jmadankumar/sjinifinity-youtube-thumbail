import React, { useEffect } from "react";
import styled from "styled-components";

import { ThumbailConfig } from "../types";
import {
  createGroup,
  createImage,
  createRect,
  createText,
  createTextSpan,
} from "../utils/svg.util";

const SVG_NS = "http://www.w3.org/2000/svg";

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: auto;
`;
interface ThumbnailProps {
  config: ThumbailConfig;
}
const getFontUnit = (size: number) => {
  return `${size}px`;
};
const Thumbnail: React.FC<ThumbnailProps> = ({ config }) => {
  const { width, height, fontFamily } = config;

  const renderChannel = (svg: SVGElement) => {
    const group = createGroup();

    const text = createText(config.channel);
    group.append(text);
    svg.append(group);

    const paddingX = config.channel.paddingX ?? 0;
    const paddingY = config.channel.paddingY ?? 0;

    const textBBox = text.getBBox();
    config.channel.width = textBBox.width + paddingX * 2;
    config.channel.height = textBBox.height + paddingY * 2;

    text.setAttribute("width", textBBox.width + "");
    text.setAttribute("height", textBBox.height + "");
    text.setAttribute("x", textBBox.x + paddingX + "");

    const rect = createRect(config.channel);
    group.prepend(rect);
  };

  const renderTopic = (svg: SVGElement) => {
    const group = createGroup();
    const text = createText(config.topic, true);

    const yAxis = config.topic.y;
    text.setAttribute("y", yAxis + "");
    text.setAttribute("id", "topic");

    (config.topic.text as Array<string>).forEach((textContext, index) => {
      const tspan = createTextSpan(config.topic, textContext);
      tspan.setAttribute("x", 0 + "");
      tspan.setAttribute(
        "y",
        yAxis + index * (config.topic.fontSize + config.topic.paddingY) + ""
      );
      text.appendChild(tspan);
    });

    group.append(text);

    svg.append(group);

    const textBox = text.getBBox();
    const xAxis = config.width - textBox.width;
    text.setAttribute("x", xAxis - config.topic.paddingX + "");

    for (let i = 0; i < text.children.length; i++) {
      const tspan = text.children[i] as SVGTSpanElement;
      const tspanBox = tspan.getBBox();
      tspan.setAttribute(
        "x",
        width - tspanBox.width - config.topic.paddingX + ""
      );
    }
  };

  const renderChapter = (svg: SVGElement) => {
    const group = createGroup();

    const text = createText(config.chapter);
    group.append(text);
    svg.append(group);

    const paddingX = config.chapter.paddingX ?? 0;
    const paddingY = config.chapter.paddingY ?? 0;

    const textBBox = text.getBBox();
    config.chapter.width = textBBox.width + paddingX * 2;
    config.chapter.height = textBBox.height + paddingY * 2;

    text.setAttribute("width", textBBox.width + "");
    text.setAttribute("height", textBBox.height + "");

    const xAxis = width - (textBBox.width + paddingX * 3);
    text.setAttribute("x", xAxis + "");

    const rect = createRect(config.chapter);
    group.prepend(rect);

    rect.setAttribute("x", xAxis - paddingX + "");
    rect.setAttribute("id", "chapter");

    const topicBBox = getTopicBBox();
    rect.setAttribute(
      "y",
      topicBBox.y + topicBBox.height + config.chapter.height - paddingY * 2 + ""
    );
    text.setAttribute(
      "y",
      topicBBox.y +
        topicBBox.height +
        config.chapter.height -
        paddingY * 2 +
        config.chapter.fontSize +
        ""
    );
  };

  const getTopicBBox = () => {
    const topicElement = document.querySelector("#topic") as SVGTextElement;
    return topicElement.getBBox();
  };
  const getChapterBBox = () => {
    const chapterElement = document.querySelector("#chapter") as SVGTextElement;
    return chapterElement.getBBox();
  };
  const renderSubject = (svg: SVGElement) => {
    const group = createGroup();

    const text = createText(config.subject);
    group.append(text);
    svg.append(group);

    const paddingX = config.subject.paddingX ?? 0;
    const paddingY = config.subject.paddingY ?? 0;

    const textBBox = text.getBBox();
    config.subject.width = textBBox.width + paddingX * 2;
    config.subject.height = textBBox.height + paddingY * 2;

    text.setAttribute("width", textBBox.width + "");
    text.setAttribute("height", textBBox.height + "");

    const xAxis = width - (textBBox.width + paddingX * 3);
    text.setAttribute("x", xAxis + "");

    const rect = createRect(config.subject);
    group.prepend(rect);

    rect.setAttribute("x", xAxis - paddingX + "");

    const chapterBox = getChapterBBox();
    rect.setAttribute(
      "y",
      chapterBox.y +
        chapterBox.height +
        config.subject.height -
        paddingY * 2 +
        ""
    );
    text.setAttribute(
      "y",
      chapterBox.y +
        chapterBox.height +
        config.subject.height -
        paddingY * 2 +
        config.subject.fontSize +
        ""
    );
  };

  const renderBackground = (svg: SVGElement) => {
    const group = createGroup();
    const rect = createRect(config);
    group.appendChild(rect);
    svg.append(group);
  };

  const renderImage = (svg: SVGElement) => {
    const group = createGroup();
    const image = createImage(config.image);
    group.appendChild(image);
    svg.append(group);
  };

  const removeAllChildNodes = parent => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const renderSvg = () => {
    const svg = document.querySelector("#svg") as SVGElement;
    if (svg) {
      removeAllChildNodes(svg);
      renderBackground(svg);
      renderImage(svg);
      renderChannel(svg);
      renderTopic(svg);
      renderChapter(svg);
      renderSubject(svg);
    }
  };
  useEffect(() => {
    renderSvg();
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
      ></svg>
    </ThumbnailWrapper>
  );
};
export default Thumbnail;
