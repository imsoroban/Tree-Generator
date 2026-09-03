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
  //ajahahahahahhahjajajajajajajajajaja i hate js i do i really do
  if (rect.width <= 0 || rect.height <= 0) return;

  cssWidth = rect.width;
  cssHeight = rect.height;

  canvas.width = Math.round(cssWidth * dpr);
  canvas.height = Math.round(cssHeight * dpr);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  renderTree();
}

function renderTree() {
  const branchCount = tree.render(cssWidth, cssHeight);
  statLabel.textContent = `Branches: ${branchCount.toLocaleString()}`;
}

// possibly worst language ever
function queueRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    renderTree();
  });
}

function syncLabel(key, formatter = (v) => v) {
  valueLabels[key].textContent = formatter(inputs[key].value);
}

function syncAllLabels() {
  syncLabel("depth");
  syncLabel("angle", (v) => `${v}°`);
  syncLabel("decay", (v) => Number(v).toFixed(2));
  syncLabel("trunkHeight");
  syncLabel("trunkWidth");
  syncLabel("startHue", (v) => `${v}°`);
  syncLabel("tipHue", (v) => `${v}°`);
}

function applyInputsToConfig() {
  tree.setConfig({
    depth: Number(inputs.depth.value),
    angle: Number(inputs.angle.value),
    decay: Number(inputs.decay.value),
    trunkHeight: Number(inputs.trunkHeight.value),
    trunkWidth: Number(inputs.trunkWidth.value),
    startHue: Number(inputs.startHue.value),
    tipHue: Number(inputs.tipHue.value),
  });
}

function handleInputChange() {
  syncAllLabels();
  applyInputsToConfig();
  queueRender();
}

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

function randomInRange(min, max, precision = 0) {
  const factor = Math.pow(10, precision);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

randomizeBtn.addEventListener("click", () => {
  inputs.depth.value = randomInRange(4, 12, 0);
  inputs.angle.value = randomInRange(10, 60, 0);
  inputs.decay.value = randomInRange(0.55, 0.85, 2);
  inputs.trunkHeight.value = randomInRange(80, 220, 0);
  inputs.trunkWidth.value = randomInRange(4, 20, 0);
  inputs.startHue.value = randomInRange(0, 360, 0);
  inputs.tipHue.value = randomInRange(0, 360, 0);

  handleInputChange();
});

resetBtn.addEventListener("click", () => {
  Object.keys(DEFAULT_CONFIG).forEach((key) => {
    inputs[key].value = DEFAULT_CONFIG[key];
  });
  handleInputChange();
});