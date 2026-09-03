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

const valueLabels = {
  depth: document.getElementById("depthValue"),
  angle: document.getElementById("angleValue"),
  decay: document.getElementById("decayValue"),
  trunkHeight: document.getElementById("trunkHeightValue"),
  trunkWidth: document.getElementById("trunkWidthValue"),
  startHue: document.getElementById("startHueValue"),
  tipHue: document.getElementById("tipHueValue"),
};

const randomizeBtn = document.getElementById("randomizeBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const statLabel = document.getElementById("statLabel");

const DEFAULT_CONFIG = {
  depth: 9,
  angle: 25,
  decay: 0.7,
  trunkHeight: 140,
  trunkWidth: 12,
  startHue: 28,
  tipHue: 132,
};

const tree = new Tree(ctx, { ...DEFAULT_CONFIG });

let cssWidth = 0;
let cssHeight = 0;
let renderQueued = false;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasContainer.getBoundingClientRect();