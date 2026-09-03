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