import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Thumbnail from "../components/Thumbnail";
import html2canvas from "html2canvas";
import computedStyleToInlineStyle from "computed-style-to-inline-style";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { defaultThumbnailConfig } from "../config/thumbnail-config";
import { ThumbailConfig } from "../types";
import Header from "../components/header";
import Button from "../components/commons/Button";

//https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f
const Wrapper = styled.div`
  height: calc(100vh - 150px);
  aside {
    min-width: 300px;
  }
`;

const IndexPage = ({ data }) => {
  const [config, setConfig] = useState(defaultThumbnailConfig);
  const download = function(href, name){
    const link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
    document.body.append(link);
    link.href = href;
    link.click();
    link.remove();
  }
  const svgToCanvas = () => {
    const svgElement = document.querySelector("#svg") as SVGGraphicsElement;
    if (svgElement) {
      const { width, height } = svgElement.getBBox();
      const clonedSvgElement = svgElement.cloneNode(true) as Element;
      const outerHTML = clonedSvgElement.outerHTML;
   
      const blob = new Blob([outerHTML], {
        type: "image/svg+xml;charset=utf-8",
      });
    
      // let URL: URL = window.URL || window.webkitURL || window;
      let blobURL = URL.createObjectURL(blob);
      console.log(blobURL);
      let image = new Image();
      image.onload = () => {
        let canvas = document.createElement("canvas");

        canvas.width = width;

        canvas.height = height;
        let context = canvas.getContext("2d");
        // draw image in canvas starting left-0 , top - 0
        context.font = "normal bold 30px Quicksand";
        context.drawImage(image, 0, 0, width, height);
        //  downloadImage(canvas); need to implement
        
        let png = canvas.toDataURL();
        
        download(png, "image.png");
      };
      image.onerror = (error)=>{
        console.log(error);
      }
      image.src = blobURL;
    
    }

  };
  const onSave = () => {
    // svgToCanvas(document.querySelector('#capture'));
    const elem = document.querySelector("#capture");
    console.log(elem.getElementsByTagName("svg"));

    svgToCanvas();
    // html2canvas(document.querySelector("#capture"), { useCORS: true }).then(
    //   canvas => {
    //     const img = canvas.toDataURL("image/png");
    //     const image = document.createElement("img");
    //     const link = document.createElement("a") as HTMLAnchorElement;
    //     link.href = img;
    //     link.download = "thumbnail.png";
    //     link.click();
    //   }
    // );
  };

  const onConfigChange = (config: ThumbailConfig) => {
    setConfig(config);
  };

  useEffect(() => {
    setConfig(config);
  }, []);
  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        extra={
          <Button color="danger" size="small" onClick={onSave}>
            Download
          </Button>
        }
      />
      <div className="w-full h-full overflow-hidden bg-gray-800"></div>
      <Wrapper className="flex w-full border-b">
        <SideBar thumbnailConfig={config} onChange={onConfigChange} />
        <div className="flex-grow p-4">
          <Thumbnail config={config} />
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
