import Tree from "./Tree.js";

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.getElementById("canvasContainer");

const inputs = {
    depth: document.getElementById("depth"),
  angle: document.getElementById("angle"),
  decay: document.getElementById("decay"),
  trunkHeight: document.getElementById("trunkHeight"),
  trunkWidth: document.getElementById("trunkWidth"),
  startHue: document.getElementById("startHue"),
  tipHue: document.getElementById("tipHue"),
};