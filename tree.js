export default class Tree {
  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.branchCount = 0;
  }

  setConfig(patch) {
    this.config = { ...this.config, ...patch };
  }

  render(width, height) {
    const { ctx } = this;
    this.branchCount = 0;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    ctx.translate(width / 2, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    this._drawBranch(this.config.trunkHeight, this.config.depth);

    ctx.restore();
    return this.branchCount;
  }

  _drawBranch(length, depthRemaining) {
    const { ctx, config } = this;

    const currentDepth = config.depth - depthRemaining;
    const t = config.depth === 0 ? 1 : currentDepth / config.depth;

    ctx.strokeStyle = this._colorForDepth(t);
    ctx.lineWidth = Math.max(
      config.trunkWidth * (depthRemaining / Math.max(config.depth, 1)),
      0.4
    );

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    this.branchCount++;

    if (depthRemaining <= 0) return;

    ctx.translate(0, -length);

    const nextLength = length * config.decay;
    const angleRad = this._degToRad(config.angle);

    ctx.save();
    ctx.rotate(angleRad);
    this._drawBranch(nextLength, depthRemaining - 1);
    ctx.restore();

    ctx.save();
    ctx.rotate(-angleRad);
    this._drawBranch(nextLength, depthRemaining - 1);
    ctx.restore();
  }

  _colorForDepth(t) {
    const clamped = Math.min(Math.max(t, 0), 1);
    const { startHue, tipHue } = this.config;

    const hue = this._lerpHue(startHue, tipHue, clamped);
    const saturation = this._lerp(55, 85, clamped);
    const lightness = this._lerp(32, 62, clamped);

    return `hsl(${hue.toFixed(1)}, ${saturation.toFixed(1)}%, ${lightness.toFixed(1)}%)`;
  }

  _lerp(a, b, t) {
    return a + (b - a) * t;
  }

  _lerpHue(h1, h2, t) {
    const delta = ((h2 - h1 + 540) % 360) - 180;
    return (h1 + delta * t + 360) % 360;
  }

  _degToRad(deg) {
    return (deg * Math.PI) / 180;
  }
}