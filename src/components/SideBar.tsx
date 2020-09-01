import React, { useState } from "react";
import styled from "styled-components";
import Input from "./commons/Input";
import Button from "./commons/Button";
import { ThumbailConfig } from "../types";

const SideBarWrapper = styled.aside``;

interface SideBarProps {
  onSave?: (config: ThumbailConfig) => void;
  onChange: (config: ThumbailConfig) => void;
  thumbnailConfig: ThumbailConfig;
}
const SideBar: React.FC<SideBarProps> = ({ onChange, thumbnailConfig }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let config = { ...thumbnailConfig };
    if (name === "channelName") {
      config.channel.text = value;
    } else if (name === "subjectName") {
      config.subject.text = value;
    } else if (name === "chapterName") {
      config.chapter.text = value;
    }

    onChange(config);
  };

  const handleChangeTopic = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    let config = { ...thumbnailConfig };
    config.topic.text[index] = value;

    onChange(config);
  };

  const handleAddText = () => {
    let config = { ...thumbnailConfig };
    config.topic.text.push("");

    onChange(config);
  };
  const removeTopic = (index: number) => {
    let config = { ...thumbnailConfig };
    config.topic.text.splice(index, 1);
    config.topic.text = [...config.topic.text];
    onChange(config);
  };
  return (
    <SideBarWrapper className="flex flex-col p-4 border-gray-400 border-r">
      <section className="mb-5">
        <h2 className="font-bold">Channel Name</h2>
        <Input className="w-full" name="channelName" onChange={handleChange} value={thumbnailConfig.channel.text}/>
      </section>
      <section className="mb-5">
        <h2 className="font-bold">Subject Name</h2>
        <Input className="w-full" name="subjectName" onChange={handleChange} value={thumbnailConfig.subject.text}/>
      </section>
      <section className="mb-5">
        <h2 className="font-bold">Chapter Name</h2>
        <Input className="w-full" name="chapterName" onChange={handleChange} value={thumbnailConfig.chapter.text}/>
      </section>
      <section className="mb-5">
        <h2 className="font-bold">Topic Name</h2>
        {thumbnailConfig.topic.text.map((text, index) => {
          return (
            <div className="flex flex-row justify-center items-center mb-5">
              <Input
                className="w-full flex-grow mr-2"
                name="topicName"
                onChange={event => handleChangeTopic(event, index)}
                value={text}
              />
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => removeTopic(index)}
                className="cursor-pointer w-8 h-8"
              >
                <path
                  d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0"
                  fill="#ffe6e2"
                />
                <g fill="#fc573b">
                  <path d="m342.734375 312.574219-143.308594-143.308594c-6.257812-6.257813-16.386719-6.257813-22.625 0l-7.535156 7.535156c-6.257813 6.253907-6.257813 16.382813 0 22.625l143.308594 143.308594c6.257812 6.257813 16.386719 6.257813 22.625 0l7.535156-7.535156c6.257813-6.253907 6.257813-16.382813 0-22.625zm0 0" />
                  <path d="m312.574219 169.265625-143.308594 143.308594c-6.257813 6.257812-6.257813 16.386719 0 22.625l7.535156 7.535156c6.253907 6.257813 16.382813 6.257813 22.625 0l143.308594-143.308594c6.257813-6.257812 6.257813-16.386719 0-22.625l-7.535156-7.535156c-6.253907-6.257813-16.382813-6.257813-22.625 0zm0 0" />
                </g>
              </svg>
            </div>
          );
        })}
        <Button onClick={handleAddText} size="medium">
          Add Topic
        </Button>
      </section>
    </SideBarWrapper>
  );
};

export default SideBar;
