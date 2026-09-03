export default class Tree {
  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.branchcount = 0;
  }
  
  setConfig(patch) {
    this.config = { ...this.config, ...patch };
  }