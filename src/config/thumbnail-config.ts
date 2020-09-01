import { ThumbailConfig } from "../types";
import Image from "../images/maths_learning.svg";

export const defaultThumbnailConfig: ThumbailConfig = {
  width: 580,
  height: 285,
  backgroundColor: "#feb743",
  fontFamily: "Quicksand",
  x: 0,
  y: 0,
  channel: {
    fontSize: 27,
    fontColor: "#feb743",
    backgroundColor: "#2f2e41",
    x: 0,
    y: 0,
    text: "SJ INFINITY MATHS",
    fontFamily: "Quicksand",
  },
  subject: {
    fontSize: 27,
    fontColor: "#feb743",
    backgroundColor: "#2f2e41",
    x: 0,
    y: 0,
    text: "SJ INFINITY MATHS",
    fontFamily: "Quicksand",
  },
  chapter: {
    fontSize: 27,
    fontColor: "#feb743",
    backgroundColor: "#2f2e41",
    x: 0,
    y: 0,
    text: "SJ INFINITY MATHS",
    fontFamily: "Quicksand",
  },
  topic: {
    fontSize: 19,
    fontColor: "#2f2e41",
    backgroundColor: "#feb743",
    x: 300,
    y: 77,
    text: ["SJ INFINITY MATHS"],
    fontFamily: "Quicksand",
  },
  image: {
    href: Image,
    x: 20,
    y: 95,
    width: 180,
    height: 180,
  },
};
