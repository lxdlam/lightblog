import QueryProxy from "./query";

export default class {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.modules = new Map();
    this.proxy = new QueryProxy(this.baseURL);
  }

  registerModule(name, instance) {
    this.modules.set(name, instance);

    const map = this.modules;
    Object.defineProperty(this.prototype, name, {
      get() {
        return map.get(name);
      }
    });
  }
}
