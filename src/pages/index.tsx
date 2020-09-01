import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import loadable from "@loadable/component";
import cx from "classnames";
import Thumbnail from "../components/Thumbnail";
import html2canvas from "html2canvas";
import computedStyleToInlineStyle from "computed-style-to-inline-style";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { defaultThumbnailConfig } from "../config/thumbnail-config";
import { ThumbailConfig } from "../types";
import Header from "../components/header";
import Button from "../components/commons/Button";

const Wrapper = styled.div`
  height: calc(100vh - 150px);
  aside {
    min-width: 300px;
  }
`;
function svgToCanvas(targetElem) {
  var svgElem = targetElem.getElementsByTagName("svg");
  for (const node of svgElem) {
    node.setAttribute(
      "font-family",
      window.getComputedStyle(node, null).getPropertyValue("font-family")
    );
    node.replaceWith(node);
  }
}
const IndexPage = ({ data }) => {
  const [config, setConfig] = useState(defaultThumbnailConfig);
  const onSave = () => {
    // svgToCanvas(document.querySelector('#capture'));
    const elem = document.querySelector("#capture");
    console.log(elem.getElementsByTagName("svg"));
    computedStyleToInlineStyle(document.getElementsByTagName("svg")[0], {
      recursive: true,
      properties: ["font-size", "font-family", "font-weight"],
    });

    console.log(document.querySelector("#capture"));
    html2canvas(document.querySelector("#capture")).then(canvas => {
      const img = canvas.toDataURL("image/png");
      const image = document.createElement("img");
      const link = document.createElement('a') as HTMLAnchorElement;
      link.href= img;
      link.download = 'thumbnail.png';
      link.click();
    });
  };

  const onConfigChange = (config: ThumbailConfig) => {
    setConfig(config);
  };
  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      <Header siteTitle={data.site.siteMetadata.title} extra={
       <Button color="danger" size="small" onClick={onSave}>Download</Button>
      }/>
      <div className="w-full h-full overflow-hidden bg-gray-800"></div>
      <Wrapper className="flex w-full border-b">
        <SideBar thumbnailConfig={config} onChange={onConfigChange} />
        <div className="flex-grow p-4">
          <Thumbnail config={config}/>
        </div>
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
export default IndexPage;
