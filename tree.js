export default class Tree {
  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.branchCount = 0;
  }

  setConfig(patch) {
    this.config = { ...this.config, ...patch };
  }

  render(width, height)